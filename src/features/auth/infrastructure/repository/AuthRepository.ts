import { prisma } from "../../../../lib/prisma";
import { RegisterDTO } from "../../domain/DTO/RegisterDTO";

export class AuthRepository {
  async getUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }

  async createUser(dto: RegisterDTO) {
    return prisma.user.create({ data: dto });
  }
}
