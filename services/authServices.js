const { PrismaClient } = require("@prisma/client");
const typeServices = require("../services/typeServices")
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

const signup = async (name, email, password) => {
  const prisma = new PrismaClient();
  let [user] = await prisma.user.findMany({
    where: {
      email: email,
    },
  });
  if (user) {
    return false;
  }
  const typesDefault = await  typeServices.findTypesByDefault();
  let typeOnUserToCreate = []
  for (let index = 0; index < 7; index++) {
    typeOnUserToCreate.push({
      type:{
        create:{
          color: typesDefault[index].color
        }
      }
    });
  }
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      types:{
        create: typeOnUserToCreate
      }
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

const resetpassword = async (newPassword, token) => {
  const prisma = new PrismaClient();
  try {
    let [user] = await prisma.user.findMany({
      where: {
        resetPasswordToken: token,
      },
    });

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user = await prisma.user.update({
      where: {
        resetPasswordToken: token,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
      },
    });

    return user;
  } catch (error) {
    console.log('error: ', error);
    return false;
  }
};

module.exports = {
  signin,
  signup,
  changepassword,
  resetpassword,
};
