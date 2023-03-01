const { prisma } = require("../prisma/prismaStore");

const getTypesByUser = (userId) => {
    console.log('userId: ', userId);
  return prisma.typeOnUser.findMany({
    where: {
      user_id: userId,
    },
    select: {
        type:{
            select :{
                color : true,
                id : true,
                name : true
            }
        },
    },
  });
};
const findTypesByDefault = async () => {
  console.log("asas");
  const typesDefaults = await prisma.type.findMany({
    where: {
      id: {
        in: [1, 2, 3, 4, 5, 6, 7],
      },
    },
  });

  return typesDefaults;
};



module.exports = {
    getTypesByUser,
    findTypesByDefault
}