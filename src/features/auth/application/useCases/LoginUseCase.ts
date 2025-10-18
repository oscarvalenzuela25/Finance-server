import { LoginDTO } from "../../domain/DTO/LoginDTO";
import bcrypt from "bcrypt";
import { AuthRepository } from "../../infrastructure/repository/AuthRepository";
import { issuePair, publicUser } from "../../utils/AuthUtils";
import { loginSchema } from "../../presentation/validators/AuthValidators";
import { validate } from "../../../../utils/schemaValidator";
import { CustomError } from "../../../../utils/CustomErrors";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(dto: LoginDTO) {
    validate(loginSchema, dto);
    const user = await this.authRepository.getUserByEmail(dto.email);
    if (!user) throw CustomError.notFound("User not found");
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw CustomError.unAuthorized("Invalid credentials");
    const tokens = issuePair(user);
    return { user: publicUser(user), ...tokens };
  }
}
