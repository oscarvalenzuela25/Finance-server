import { RegisterDTO } from "../../domain/DTO/RegisterDTO";
import { AuthRepository } from "../../infrastructure/repository/AuthRepository";
import bcrypt from "bcrypt";
import { issuePair, publicUser } from "../../utils/authUtils";
import { validate } from "../../../../utils/schemaValidator";
import { registerSchema } from "../../presentation/validators/AuthValidators";
import { CustomError } from "../../../../utils/CustomErrors";

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(dto: RegisterDTO) {
    validate(registerSchema, dto);
    const existingUser = await this.authRepository.getUserByEmail(dto.email);
    if (existingUser) throw CustomError.badRequest("Email already in use");
    const newUser = {
      name: dto.name,
      email: dto.email,
      password: bcrypt.hashSync(dto.password, 10),
    };
    const createdUser = await this.authRepository.createUser(newUser);
    const tokens = issuePair(createdUser);
    return { user: publicUser(createdUser), ...tokens };
  }
}
