// app.js
const express = require('express')
const app = express()
// include dotenv when not in production mode
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
const flash = require('connect-flash')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const csrf = require('csurf')
const methodOverride = require('method-override')
const userRoutes = require('./routes/user')
const todoRoutes = require('./routes/todo')
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const searchRoutes = require('./routes/search')
const passport = require('passport')
const session = require('express-session')
const errorController = require('./controllers/error')

// Initialize csrf protection  middleware
const csrfProtection = csrf()

// Include models
const db = require('./models')
const Todo = db.Todo
const User = db.User

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// setup session
app.use(session({
  secret: 'kldxnflkdzsfrf',
  resave: 'false',
  saveUninitialized: 'false'
}))

// set up passport
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

// set up connect-flash
app.use(flash())

// use csrf protection middleware after session
app.use(csrfProtection)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.reminder = req.flash('reminder')
  res.locals.warning = req.flash('warning')
  res.locals.success = req.flash('success')
  // generate one CSRF token to every render page
  res.locals.csrfToken = req.csrfToken()
  next()
})

app.use(express.static('public'))

app.use('/todos', todoRoutes)

app.use('/users', userRoutes)

app.use('/auth', authRoutes)

app.use('/search', searchRoutes)

app.use('/', homeRoutes)

app.use(errorController.getError)

// 設定 express port 3000
app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})
