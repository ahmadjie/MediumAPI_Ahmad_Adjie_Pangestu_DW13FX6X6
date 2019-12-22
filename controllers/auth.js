const jwt = require('jsonwebtoken');
const model = require('../models');
const User = model.users;

exports.login = (req, res) => {
	const { email, password } = req.body;

	User.findOne({
		attributes: {
			exclude: [ 'createdAt', 'updatedAt', 'password', 'bio' ]
		},
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
					message: 'Email Password Anda Salah'
				});
			}
		})
		.catch((err) => {
			res.status(403).json({
				message: err.message
			});
		});
};

// if (user) {
// 	if (user.is_active != 1) {
// 		res.send({
// 			message: "Your account isn't activated!",
// 			data: {}
// 		});
// 	} else {
// 		const token = jwt.sign({ userId: user.id }, 'asep');
// 		res.send({
// 			message: 'Success',
// 			data: {
// 				email,
// 				token
// 			}
// 		});
// 	}
// } else {
// 	res.send({
// 		message: 'Email atau Password Salah',
// 		data: {}
// 	});
// }
