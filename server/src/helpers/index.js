import bcrypt from 'bcrypt';

class Helpers {
  static calculatePrice(quantity) {
    return quantity * 15;
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
export default Helpers;
