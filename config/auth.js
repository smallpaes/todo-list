module.exports = {
  isAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/users/login')
    }
    return next()
  }
}