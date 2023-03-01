const typeServices = require("../services/typeServices");

const getTypesByUser = async (req, res) => {
  const userId = Number(req.params.userId);
  typeServices
    .getTypesByUser(userId)
    .then((typesByUser) => {
      const typesToReturn = typesByUser.map((type) => {
        return type.type;
      });
      res.status(200).json({ error: false, types: typesToReturn });
    })
    .catch((err) => {
      res.status(500).json({ error: err.toString() });
    });
};

module.exports = {
  getTypesByUser,
};
