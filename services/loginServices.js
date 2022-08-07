const { PrismaClient } = require("@prisma/client");


const login = async (body) => {
  const prisma = new PrismaClient();
  let [user] = await prisma.user.findMany({
    where: {
      email: body.email,
    },
  });

  return user;
};

module.exports = {
    login,
};
