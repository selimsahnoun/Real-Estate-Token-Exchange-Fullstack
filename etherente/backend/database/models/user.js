const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		first_name: String,
		last_name: String,
		email: String,
		ip_address: String,
		hashed_password: String,
		salt: String,
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
