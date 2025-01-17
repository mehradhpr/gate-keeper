const Account = require("../../models/account")


const registerAccount = async (accountData) => {
  const newAccount = new Account(accountData);
  await newAccount.save();
}

const loginAccount = async (email, password) => {

}

const blacklistToken = async (token) => {

}

module.exports = {registerAccount, loginAccount, blacklistToken}