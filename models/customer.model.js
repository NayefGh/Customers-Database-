const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
 fullName: { type: String, required: true },
 email: { type: String, required: true, unique: true },
 mobile: { type: String, required: true },
 description: { type: String, required: true },

});

module.exports = mongoose.model('Customer', customerSchema);