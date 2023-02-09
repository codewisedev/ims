const controller = require('app/http/controllers/controller')
const request = require('request')
const url = require('url')

class resetPasswordController extends controller {
  showForgotPassword(req, res, next) {
    try {
      const title = 'فراموشی رمز عبور'
      res.render('auth/agent/reset-password/sendCode', {
        recaptcha: this.recaptcha.render(),
        title
      })
    } catch (error) {
      next(error)
    }
  }

  showResetPassword(req, res, next) {
    try {
      const title = 'بازیابی رمز عبور'
      res.render('auth/agent/reset-password/reset', { title })
    } catch (error) {
      next(error)
    }
  }

  async sendPasswordResetCode(req, res, next) {
    try {
      let result = await this.validationData(req)
      if (result) return this.sendResetCode(req, res)
    } catch (error) {
      next(error)
    }
  }

  async activationCode(mobile) {
    let code = await this.createCode().toString()
    let newActiveCode = new this.model.ActiveCode({
      mobile,
      code,
      expire: Date.now() + 1000 * 60 * 5
    })
    await newActiveCode.save()
    return code
  }

  createCode() {
    return Math.floor(1000 + Math.random() * 9000)
  }

  async sendResetCode(req, res, next) {
    try {
      var mobile = this.trimSpace(req.body.mobile)
      let user = await this.model.User.findOne({ mobile })
      if (user) {
        let code = await this.activationCode(mobile)
        let options = {
          method: 'POST',
          url: '',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Cookie: ''
          },
          form: {
            login_username: '',
            login_password: '',
            receiver_number: mobile,
            'note_arr[]': `کد بازیابی رمز عبور شما در بیمه: ${code}`,
            sender_number: ''
          }
        }
        // eslint-disable-next-line no-unused-vars
        await request(options, function (error, response) {
          if (error) throw new Error(error)
        })
        res.redirect(
          url.format({
            pathname: '/auth/agent/password/reset/token',
            query: {
              mobile
            }
          })
        )
      } else {
        req.flash('errors', 'چنین کاربری وجود ندارد!')
        return res.redirect(req.originalUrl)
      }
    } catch (error) {
      next(error)
    }
  }

  async resetPasswordProccess(req, res, next) {
    try {
      let result = await this.validationData(req)
      if (result) return this.resetPassword(req, res)
      return this.back(req, res)
    } catch (error) {
      next(error)
    }
  }

  async resetPassword(req, res, next) {
    try {
      let mobile = req.body.mobile
      let code = req.body.code
      let activeCode = await this.model.ActiveCode.find({ mobile })
        .gt('expire', new Date())
        .sort({ createdAt: -1 })
      if (activeCode.length > 0 && code == activeCode[0].code) {
        try {
          await activeCode[0].updateOne({
            $set: { use: true }
          })
        } catch (error) {
          console.log(error)
        }
        let user = await this.model.User.findOne({ mobile })
        if (!user) {
          req.flash('errors', 'چنین کاربری پیدا نشد')
          return this.back()
        } else {
          user.$set({ password: user.hashPassword(req.body.password) })
          await user.save()
        }
        return res.redirect('/auth/agent')
      }
      req.flash('errors', 'کد وارد شده صحیح نیست')
      return this.back(req, res)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new resetPasswordController()
