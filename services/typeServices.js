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


module.exports = {
    getTypesByUser
}