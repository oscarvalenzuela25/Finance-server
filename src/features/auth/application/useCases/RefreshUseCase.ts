import { verifyRefresh } from "../../../../config/jwt";
import { CustomError } from "../../../../utils/CustomErrors";
import { validate } from "../../../../utils/schemaValidator";
import { AuthRepository } from "../../infrastructure/repository/AuthRepository";
import { refreshTokenSchema } from "../../presentation/validators/AuthValidators";
import { issuePair } from "../../utils/AuthUtils";

export class RefreshUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(refreshToken: string) {
    validate(refreshTokenSchema, { refreshToken });
    const payload = verifyRefresh(refreshToken);
    const user = await this.authRepository.getUserByEmail(
      payload.email as string
    );
    if (!user) throw CustomError.notFound("User not found");
    const tokens = issuePair(user);
    return tokens;
  }
}
