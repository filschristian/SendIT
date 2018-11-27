class Middlewares {
  /*
   * Function got from a tutorial on youtube
   * link: https://www.youtube.com/watch?v=7nafaH9SddU
   * credits to: TRAVERSY MEDIA
   */
  static verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      req.token = bearerHeader;
      next();
    }
    res.status(403).send({ message: 'You dont have Authorization' });
  }
}
export default Middlewares;
