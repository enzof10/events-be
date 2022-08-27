const { colorsList } = require("../constants/labelsConstats");
const { prisma } = require("../prisma/prismaStore");

/**
 * It creates a new typeOnUser for each type_id from 1 to 7, and for a given user_id
 * @param userId - The id of the user you want to add the types to.
 * @returns An array of promises
 */
const addTypeToUser = async (userId) => {
  const typesDefault = await findTypesByDefault();
  let typeOnUserToCreate = [];
  for (let index = 0; index < 7; index++) {
    typeOnUserToCreate.push({
      type_id: typesDefault[index].id,
      user_id: userId,
    });
  }

  try {
    const res = await prisma.typeOnUser.createMany({
      data: typeOnUserToCreate,
    });
    return res;
  } catch (err) {
    console.log('err: ', err);
    return {
      objetError: err,
      error: true,
    };
  }
};

const findTypesByDefault = async () => {
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
  addTypeToUser,
};
