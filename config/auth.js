module.exports = {
  isAuthenticated: (req, res, next) => {
    // Not sign in yet
    if (!req.isAuthenticated()) {
      req.flash('reminder', 'Kindly log in first!')
      return res.redirect('/users/login')
    }
    return next()
  }
}