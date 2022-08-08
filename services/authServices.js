const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const signin = async (email) => {
  const prisma = new PrismaClient();
  let [user] = await prisma.user.findMany({
    where: {
      email: email,
    },
  });

  return user;
};

const signup = async (email, password, name) => {
  const prisma = new PrismaClient();
  let user = await prisma.user.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return false;
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  return user;
};

const changepassword = async (email, newPassword, oldPassword) => {
  const prisma = new PrismaClient();
  let [user] = await prisma.user.findMany({
    where: {
      email: email,
    },
  });

  const isValid = bcrypt.compareSync(oldPassword, user?.password);
  if (!isValid || !user) {
    return false;
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return user;
};

module.exports = {
  signin,
  signup,
  changepassword,
};