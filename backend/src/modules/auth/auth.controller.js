const {
  registerAccount,
  loginAccount,
  blacklistToken,
} = require("./auth.service");

const register = async (req, res) => {
  try {
    // Register Account with the request body
    await registerAccount(req.body);

    // Respond
    res.status(201).json({
      success: true,
      message: "Account is Successfully Registered",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Registration Error: ${err.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    // Extract email and password
    const { email, password } = req.body;

    // Login and get the account info + token
    const { account, token } = await loginAccount(email, password);

    // Respond
    res.status(200).json({
      account,
      token,
      success: true,
      message: "Login Successful",
    });
  } catch (err) {
    res.status(401).json({
      account: null,
      token: null,
      success: false,
      message: `Login Error: ${err.message}`,
    });
  }
};

const logout = async (req, res) => {
  try {
    // Extract the Token
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Error Logging out: No Token Provided",
      });
    }
    // Blacklist the Token
    await blacklistToken(token);

    // Respond
    res.status(200).json({
      success: true,
      message: "Logout Succussful: Token Blacklisted",
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: `Error Logging out: ${err.message}`,
    });
  }
};

module.exports = { register, login, logout };
