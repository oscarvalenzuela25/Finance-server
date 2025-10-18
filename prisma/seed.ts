import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data: [
      { name: "Oscar", email: "oscar@example.com", password: "123456" },
      { name: "Lucía", email: "lucia@example.com", password: "123456" },
    ],
  });
  await prisma.category.createMany({
    data: [
      { key: "all" },
      { key: "entertainment" },
      { key: "bills" },
      { key: "groceries" },
      { key: "diningOut" },
      { key: "transportation" },
      { key: "personalCare" },
      { key: "education" },
      { key: "lifestyle" },
      { key: "shopping" },
      { key: "general" },
      { key: "salary" },
    ],
  });
};

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
