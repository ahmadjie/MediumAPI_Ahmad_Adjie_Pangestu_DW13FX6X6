const jwt = require('jsonwebtoken');
const model = require('../models');
const User = model.users;

exports.login = (req, res) => {
	const { email, password } = req.body;

	User.findOne({
		where: {
			email,
			password
		}
	})
		.then((user) => {
			if (user) {
				if (user.is_active != 1) {
					res.send({
						message: 'Akunmu belum teraktivasi',
						data: {}
					});
				} else {
					const token = jwt.sign({ userId: user.id }, 'asep');
					if (token) {
						res.status(200).json({
							message: 'Success',
							data: {
								email,
								token
							}
						});
					}
				}
			} else {
				res.status(403).json({
					message: 'email Password Anda Salah'
				});
			}
		})
		.catch((err) => {
			res.status(403).json({
				message: err.message
			});
		});
};

exports.register = (req, res) => {
	const { fullname, username, email, password } = req.body;

	User.create({
		fullname: fullname,
		username: username,
		email: email,
		password: password,
		is_active: 0
	}).then((data) => {
		const token = jwt.sign({ userId: User.id }, 'asep');
		res.send({
			message: 'success',
			data: {
				username,
				token
			}
		});
	});
};
