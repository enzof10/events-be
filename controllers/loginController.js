const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginServices = require("../services/loginServices");

const login = async (req, res) => {
  const { body } = req;
  const user = await loginServices.login(body);

  const isPasswordValid =
    user === null ? false : await bcrypt.compare(body.password, user.password);
    
  if (!isPasswordValid) {
    return res.status(401).send({
      error: "Invalid username or password",
    });
  }

  const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET, {
    expiresIn: "1h",
  });

  res.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

module.exports = {
  login,
};
