const controller = require('app/http/controllers/controller');
class insuranceController extends controller {
	async index(req, res) {
		let agents = await this.model.Agency.find({}).populate(
			'insuranceCompany user',
		);
		const title = 'لیست نمایندگی های بیمه';
		res.render('admin/insurance', { title, agents });
	}

	async create(req, res) {
		let states = await this.model.State.find();
		let companies = await this.model.InsuranceCompany.find();
		const title = 'نماینده بیمه';
		res.render('admin/insurance/create', {
			title,
			states,
			companies,
		});
	}

	async getCity(req, res) {
		try {
			let steteId = await req.body.id;
			let cities = await this.model.City.find({ state: steteId });
			return res.json(cities);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new insuranceController();
