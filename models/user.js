var crypto = require('crypto');

const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}

const encryptPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex');
}

const users = [
  {email: 'edrachma@pratt.edu', name: 'Emily', salt: '2296c25f74263e98585d625f4349738c', encryptedPassword: '4f029bc2ae5b4014d308541076dcb0c6b7b08bfa235ebbf8ff31f0e559a88f91'}
];

exports.add = (user) => {
  let salt = createSalt();
  let newUser = {
    email: user.email,
    name: user.name,
    salt: salt,
    encryptedPassword: encryptPassword(user.password, salt)
  }
  // console.log(newUser);
  users.push(newUser);
}


exports.getByEmail = (email) => {
  return users.find((user) => user.email === email);
};

exports.login = (login) => {
  let user = exports.getByEmail(login.email);
  if (!user) {
    return null;
  }
  let encryptedPassword = encryptPassword(login.password, user.salt);
  if (user.encryptedPassword === encryptedPassword) {
    return user;
  }
  return null;
}


exports.all = users;
