const MongoStore = require('connect-mongo')

module.exports = {
  name: 'insurance_session',
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 4) },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/insurance',
    ttl: 14 * 24 * 60 * 60 //* = 14 days Default
  })
}
