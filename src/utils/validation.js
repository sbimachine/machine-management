const CustomError = require('./CustomError');

function checkPassword(password) {
  if (password.length < 6 || password > 20) throw new CustomError('password must be 6-20 character long', 400);
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)/gm;
  if (!passRegex.test(password)) {
    throw new CustomError('password must contain at least one character and one number', 400);
  }
}
function checkPhoneNumber(phoneNumber) {
  // Regex untuk memeriksa nomor telepon Indonesia
  const phoneRegex = /^(?:\+62|08)\d{8,15}$/;

  if (!phoneRegex.test(phoneNumber)) {
    throw new CustomError('Invalid Indonesian phone number format', 400);
  }
}

module.exports = {
  checkPassword,
  checkPhoneNumber,
};
