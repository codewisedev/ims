const controller = require('app/http/controllers/controller')
const request = require('request')
const url = require('url')

class registerController extends controller {
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

  async sendCode(req, res, next) {
    try {
      var mobile = this.trimSpace(req.body.mobile)
      let user = await this.model.User.findOne({ mobile })
      if (!user) {
        let code = await this.activationCode(mobile)
        let options = {
          method: 'POST',
          url: '',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          form: {
            login_username: '',
            login_password: '',
            receiver_number: mobile,
            'note_arr[]': `بیمه ای عزیز، کد تایید شما: ${code}`,
            sender_number: ''
          }
        }
        // eslint-disable-next-line no-unused-vars
        await request(options, function (error, response) {
          if (error) throw new Error(error)
        })
        res.redirect(
          url.format({
            pathname: '/auth/agent/verify',
            query: {
              mobile
            }
          })
        )
      } else {
        req.flash('errors', 'شما قبلا ثبت نام کرده اید!')
        return this.back(req, res)
      }
    } catch (error) {
      next(error)
    }
  }

  async showVerifyForm(req, res, next) {
    try {
      const mobile = this.trimSpace(req.query.mobile)
      const title = 'بیمه | تایید شماره موبایل'
      res.render('auth/agent/verify', { title, mobile })
    } catch (error) {
      next(error)
    }
  }

  async validation(req, res) {
    try {
      let mobile = req.body.mobile
      let code = req.body.code
      let activeCode = await this.model.ActiveCode.find({ mobile: mobile })
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
        return res.json(true)
      }
      return res.json(false)
    } catch (error) {
      res.json(error)
    }
  }

  async showRegsitrationForm(req, res, next) {
    try {
      let mobile = req.query.mobile
      let code =
        req.query.code1 + req.query.code2 + req.query.code3 + req.query.code4
      let activeCode = await this.model.ActiveCode.findOne({
        mobile,
        code,
        use: true
      }).sort({ createdAt: -1 })
      if (activeCode) {
        let states = await this.model.State.find()
        const mobile = this.trimSpace(req.query.mobile)
        const title = 'ثبت نام بیمه'
        let insuranceCompanies = await this.model.InsuranceCompany.find({})
        res.render('auth/agent/register', {
          title,
          mobile,
          code,
          states,
          insuranceCompanies
        })
      } else {
        this.alertAndBack(req, res, {
          title: 'اخطار',
          text: 'شما اجازه ی ثبت نام ندارید'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async getCity(req, res, next) {
    try {
      let steteId = await req.body.id
      let cities = await this.model.City.find({ state: steteId })
      return res.json(cities)
    } catch (error) {
      next(error)
    }
  }

  async store(req, res, next) {
    try {
      console.log(req.body)
      let status = await this.validationData(req)
      if (!status) return this.back(req, res)

      let mobile = req.body.mobile
      let code = req.body.code
      let verify = await this.model.ActiveCode.findOne({
        mobile: mobile,
        code: code,
        use: true
      })

      if (verify) {
        let {
          mobile,
          avatar,
          name,
          title,
          coCode,
          orgCode,
          insuranceCompany,
          startDate,
          email,
          tell,
          password,
          state,
          city,
          address
        } = req.body

        const newUser = new this.model.User({
          manager: true,
          name,
          avatar,
          mobile,
          email,
          password
        })
        newUser.$set({ password: newUser.hashPassword(password) })

        await newUser.save().then(async (user) => {
          this.registerDevice(req, res, user)

          const newLoc = new this.model.Location({
            state,
            city,
            address
          })

          newLoc.save().then((location) => {
            new this.model.Agency({
              manager: user._id,
              title,
              slug: this.slug(title),
              logo: req.file
                ? this.imageResize(req.file, [480, 720], true)
                : undefined,
              tell,
              location,
              insuranceCompany,
              agencyCode: coCode,
              centralCode: orgCode,
              startDate
            })
              .save()
              .then(async (agency) => {
                await user.updateOne({
                  $set: { agency: agency._id }
                })
              })
          })
        })

        this.alert(req, {
          title: 'پیام',
          text: 'ثبت نام با موفقیت انجام شد. لطفا وارد شوید',
          icon: 'success',
          button: 'بستن'
        })

        return res.redirect('/auth/agent')
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new registerController()
