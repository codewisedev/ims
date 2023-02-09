const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = Schema({
	title: { type: String, required: true },
	state: { type: Schema.Types.ObjectId, ref: 'state', required: true },
});

module.exports = mongoose.model('city', citySchema);
