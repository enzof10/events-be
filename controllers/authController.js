const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginServices = require("../services/authServices");

const signin = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password are required",
      });
    }
    const user = await loginServices.signin(email);

    const isPasswordValid =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        error: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const signup = async (req, res) => {
  try {
    const { body } = req;
    const { email, password, name } = body;
    if (!email || !password || !name) {
      return res.status(400).send({
        message: "Email and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await loginServices.signup({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).send({
        message: "User already exists",
      });
    }

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const changepassword = async (req, res) => {
  try {
    const { body } = req;
    const { email, oldPassword, newPassword } = body;
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).send({
        message: "Email and password are required",
      });
    }

    const newUser = await loginServices.changepassword(email, newPassword, oldPassword);

    if (!newUser) {
      return res.status(400).send({
        message: "User not found or password is not valid",
      });
    }

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });

  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = {
  signin,
  signup,
  changepassword,
};
