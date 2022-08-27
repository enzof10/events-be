const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginServices = require("../services/authServices");
const userServices = require("../services/userServices");
const typesServices = require("../services/typesServices")

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
      { id: user.id, name: user.name, email: user.email },
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
    console.log("body: ", body);
    const { email, password, name } = body;
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const newUser = await loginServices.signup(
      body.name,
      body.email,
      body.password
    );

    const typeOnUser = await typesServices.addTypeToUser(newUser.id)
    if(typeOnUser.error){
      await userServices.deleteUser(newUser.id)
      res.status(500).json({
        message :"error crateting typeOnUser",
        objectError : typeOnUser.objetError
      })
    }

    if (!newUser) {
      res.status(400).json({
        message: "User already exists",
      });
    }

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    console.log("newUser: ", newUser);

    res.status(200).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send(error.toString());
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

    const newUser = await loginServices.changepassword(
      email,
      newPassword,
      oldPassword
    );

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

const forgotpassword = async (req, res) => {
  const { body } = req;
  const { email } = body;
  if (!email) {
    return res.status(400).send({
      message: "Email is required",
    });
  }

  const message = "Password reset link sent to your email";

  try {
    const user = await userServices.getOneUser(email);
    if (!user) {
      return res.status(400).send({
        message,
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.name },
      process.env.SECRET,
      {
        expiresIn: "10m",
      }
    );

    const url = `http://localhost:3000/resetpassword/${token}`;

    // TODO: send email with url

    res.status(200).send({
      message,
      url,
    });
  } catch (error) {
    return res.status(500).send(error.toString());
  }
};

const resetpassword = async (req, res) => {
  const { body } = req;
  const token = req.params.token;
  const { password } = body;

  if (!password || !token) {
    return res.status(400).send({
      message: "Password and token are required",
    });
  }

  const jwtPayload = jwt.verify(token, process.env.SECRET);
  if (!jwtPayload) {
    return res.status(400).send({
      message: "Invalid token",
    });
  }

  const userId = jwtPayload.id;
  const newUser = await loginServices.resetpassword(userId, password);

  if (!newUser) {
    return res.status(400).send({
      message: "User not found",
    });
  }

  const newToken = jwt.sign({ id: newUser.id }, process.env.SECRET, {
    expiresIn: "1h",
  });

  res.status(200).send({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    newToken,
  });
};

const verifytoken = async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).send({
      message: "Token is required",
    });
  }

  const jwtPayload = jwt.verify(token, process.env.SECRET);
  if (!jwtPayload) {
    return res.status(401).send({
      message: "Invalid token",
    });
  }

  const email = jwtPayload.email;
  const user = await loginServices.signin(email);
  if (!user) {
    return res.status(401).send({
      message: "User not found",
    });
  }

  const newToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
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
    token: newToken,
  });
};

module.exports = {
  signin,
  signup,
  changepassword,
  forgotpassword,
  resetpassword,
  verifytoken,
};
