const express = require('express')
const router = express.Router()
const RateLimit = require('express-rate-limit')
const apiLimiter = RateLimit({
  windowMs: 1000 * 60 * 5,
  max: 10,
  handler: function (req, res) {
    res.json({
      data: 'تعداد درخواست های شما بیش از حد مجاز می باشد، لطفا 5 دقیقه ی دیگر دوباره تلاش نمایید',
      success: false
    })
  }
})

//* Controllers
const customerController = require('app/http/controllers/web/agent/customerController')

const indexController = require('app/http/controllers/web/agent/indexController')
const ticketController = require('app/http/controllers/web/agent/ticketController')
const logController = require('app/http/controllers/web/agent/logController')
const passwordController = require('app/http/controllers/web/agent/passwordController')
const todoController = require('app/http/controllers/web/agent/todoController')
const handleController = require('app/http/controllers/handleController')
const consultantController = require('app/http/controllers/web/agent/consultantController')
const ledgerbinderController = require('app/http/controllers/web/agent/ledgerbinderController')
const profileController = require('app/http/controllers/web/agent/profileController')

//* Validators
const customerValidator = require('app/http/validators/customerValidator')

const ticketValidator = require('app/http/validators/ticketValidator')
const changePasswordValidator = require('app/http/validators/changePasswordValidator')
const profileValidator = require('app/http/validators/agentProfileValidator')

//* Middlewares
const convertFileToField = require('app/http/middlewares/convertFileToField')

//* Helpers
const upload = require('app/helpers/upload')

router.use((req, res, next) => {
  res.locals.layout = 'agent/master'
  next()
})

router.use('*', handleController.message)
router.use('*', handleController.alert)

//* Main
router.get('/', indexController.index)

//* Customer Routes
router.get('/customer/create', customerController.create)
router.post(
  '/customer/create',
  customerValidator.handle(),
  customerController.store
)
router.get('/customer/ledgerbinder', ledgerbinderController.index)
router.post(
  '/customer/ledgerbinder/prefollow',
  upload.single('voice'),
  convertFileToField.handleVoice,
  ledgerbinderController.preFollowStore
)

//* Support Routes
router.get('/ticket', ticketController.index)
router.get('/ticket/create', ticketController.create)
router.post(
  '/ticket/create',
  apiLimiter,
  upload.fields([
    { name: 'images', maxCount: 3 },
    { name: 'file', maxCount: 1 }
  ]),
  convertFileToField.handleImagesAndFile,
  ticketValidator.handle(),
  ticketController.store
)
router.get('/ticket/:id', ticketController.single)
router.post('/ticket/:id', apiLimiter, ticketController.response)

//* Security Routes
router.get('/log', logController.index)
router.put('/log/condition/true/:id', apiLimiter, logController.conditionTrue)
router.put('/log/condition/false/:id', apiLimiter, logController.conditionFalse)
router.get('/password', passwordController.index)
router.post(
  '/password',
  apiLimiter,
  changePasswordValidator.handle(),
  passwordController.change
)

//* Todo Routes
router.post('/todo/create', apiLimiter, todoController.store)
router.put('/todo/condition/true/:id', apiLimiter, todoController.conditionTrue)
router.put(
  '/todo/condition/false/:id',
  apiLimiter,
  todoController.conditionFalse
)
router.delete('/todo/:id', todoController.destroy)

//* Profile Routes
router.get('/profile', profileController.index)
router.put(
  '/profile/edit/:id',
  apiLimiter,
  profileValidator.handle(),
  profileController.update
)

//* Profile Routes
// router.get('/profile/ticket', profileController.index);
// router.get('/profile/edit', profileController.edit);
// router.put('/profile/edit/:id', profileController.update);

//* Consultant Routes
router.get('/consultant', consultantController.index)
router.get('/consultant/create', consultantController.create)
router.post('/consultant/sendcode', apiLimiter, consultantController.sendCode)
router.post('/consultant/verify', apiLimiter, consultantController.verify)
router.get('/consultant/register', consultantController.register)
router.post('/consultant/register', apiLimiter, consultantController.store)

//router.post('/comment', apiLimiter, blogController.comment);

//* Logout Routes
router.get('/logout', (req, res) => {
  req.logout()
  res.clearCookie('remember_token')
  res.redirect('/auth/agent')
})

module.exports = router
