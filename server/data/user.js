const { user } = require("../models");

async function findUserById(id) {
  return user.findOne({
    where: { id: id },
  });
}

async function findUserByEmail(email) {
  return user.findOne({ where: { email: email } });
}

async function resultUserByEmail(email) {
  const searchEmail = await user.findOne({ where: { email: email }});
  return searchEmail ? searchEmail : false;
}

async function createUser(email, name, password, phone, location, salt, sex) {
  return user.create({
    email,
    name,
    password,
    phone,
    location,
    salt,
    sex
  });
}

async function modifyUser(userId, password, phone, location, salt) {
  return user.update(
    {
      password: password,
      phone: phone,
      location: location,
      salt: salt
    },
    { where: { id: userId } },
  );
}

async function withdrawUser(userId) {
  return user.destroy({ where: { id: userId } });
}

module.exports = {
  findUserById,
  findUserByEmail,
  resultUserByEmail,
  createUser,
  modifyUser,
  withdrawUser,
};