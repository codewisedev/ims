const express = require('express')
const router = express.Router()
const RateLimit = require('express-rate-limit')
const apiLimiter = RateLimit({
  windowMs: 1000 * 60 * 5,
  max: 10,
  handler: function (req, res) {
    res.render('errors/limit')
  }
})

//* Controllers
const agentRegisterController = require('app/http/controllers/web/agent/auth/registerController')
const agentLoginController = require('app/http/controllers/web/agent/auth/loginController')
const agentResetController = require('app/http/controllers/web/agent/auth/resetPasswordController')
const adminForgotPasswordController = require('app/http/controllers/web/admin/auth/forgotPasswordController')
const adminResetPasswordController = require('app/http/controllers/web/admin/auth/resetPasswordController')
const adminLoginController = require('app/http/controllers/web/admin/auth/loginController')

//* Validators
const agentRegisterValidator = require('app/http/validators/agentRegisterValidator')
const agentLoginValidator = require('app/http/validators/agentLoginValidator')
const agentResetPasswordValidator = require('app/http/validators/agentResetPasswordValidator')
const adminForgotPasswordValidator = require('app/http/validators/adminForgotPasswordValidator')
const adminResetPasswordValidator = require('app/http/validators/adminResetPasswordValidator')
const adminLoginValidator = require('app/http/validators/adminLoginValidator')

//* Middlewares
const convertFileToField = require('app/http/middlewares/convertFileToField')
const redirectUser = require('app/http/middlewares/redirectUser')

//* Helpers
const upload = require('app/helpers/upload')

router.use((req, res, next) => {
  res.locals.layout = 'auth/master'
  next()
})

//* Agent Authenticate Routes
router.get(
  '/agent',
  redirectUser.isAuthenticated,
  agentLoginController.showLoginForm
)
router.post('/agent/sendcode', apiLimiter, agentRegisterController.sendCode)
router.get('/agent/verify', agentRegisterController.showVerifyForm)
router.post('/agent/validation', apiLimiter, agentRegisterController.validation)
router.get('/agent/register', agentRegisterController.showRegsitrationForm)
router.post('/agent/city', agentRegisterController.getCity)
router.post(
  '/agent/register',
  apiLimiter,
  upload.single('image'),
  convertFileToField.handleImage,
  agentRegisterValidator.handle(),
  agentRegisterController.store
)
router.post(
  '/agent/login',
  apiLimiter,
  agentLoginValidator.handle(),
  agentLoginController.loginProccess
)
router.get('/agent/password/reset', agentResetController.showForgotPassword)
router.post(
  '/agent/password/reset',
  apiLimiter,
  agentResetController.sendPasswordResetCode
)
router.get(
  '/agent/password/reset/token',
  agentResetController.showResetPassword
)
router.post(
  '/agent/password/reset/token',
  apiLimiter,
  agentResetPasswordValidator.handle(),
  agentResetController.resetPasswordProccess
)

//* Admin Authenticate Routes
router.get(
  '/admin',
  redirectUser.isAuthenticated,
  adminLoginController.showLoginForm
)
router.post(
  '/admin/login',
  apiLimiter,
  adminLoginValidator.handle(),
  adminLoginController.loginProccess
)
router.get(
  '/admin/password/reset',
  adminForgotPasswordController.showForgotPassword
)
router.post(
  '/admin/password/email',
  apiLimiter,
  adminForgotPasswordValidator.handle(),
  adminForgotPasswordController.sendPasswordResetLink
)
router.get(
  '/admin/password/reset/:token',
  adminResetPasswordController.showResetPassword
)
router.post(
  '/admin/password/reset',
  apiLimiter,
  adminResetPasswordValidator.handle(),
  adminResetPasswordController.resetPasswordProccess
)

module.exports = router
