const jwt = require('jsonwebtoken');
const Model = require('./models');
const User = Model.users;

const secret = 'asep';

exports.checkAuth = (req, res, next) => {
	let token = req.headers['authorization'];

	try {
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}
		if (token) {
			jwt.verify(token, secret, (err, authData) => {
				if (err) {
					res.send({
						is_success: 0,
						message: 'Failed verify token',
						data: {}
					});
				} else {
					user_id = getIdFromObject(authData);
					User.findOne({
						where: {
							id: user_id
						}
					}).then((data) => {
						next();
					});
				}
			});
		}
	} catch (err) {
		res.status(401).json({
			message: 'Token is Invalid'
		});
	}
};

function getIdFromObject(data) {
	let authData = JSON.stringify(data);
	authData = authData.split(',');
	user_id = authData[0].substring(10, data.length);
	return user_id;
}

// try {
// 		if (token === '') {
// 			return res.json({
// 				success: false,
// 				message: 'Token Belum ada'
// 			});
// 		} else {
// 			if (token.startsWith('Bearer ')) {
// 				// Remove Bearer from string
// 				token = token.slice(7, token.length);
// 			}
// 			if (token) {
// 				jwt.verify(token, secret, (err, authData) => {
// 					if (err) {
// 						res.send({
// 							is_success: 0,
// 							message: 'Failed verify token',
// 							data: {}
// 						});
// 					} else {
// 						user_id = getIdFromObject(authData);
// 						User.findOne({
// 							where: {
// 								id: user_id
// 							}
// 						})
// 							.then((data) => {
// 								next();
// 							})
// 							.catch((error) => {
// 								res.send({
// 									is_success: 0,
// 									message: 'Failed',
// 									data: {}
// 								});
// 							});
// 					}
// 				});
// 			} else {
// 				return res.json({
// 					success: false,
// 					message: 'Auth token is not supplied'
// 				});
// 			}
// 		}
// 	} catch (error) {
// 		res.status(500);
// 		res.send({
// 			is_success: 1,
// 			message: 'Token belum ada',
// 			data: {}
// 		});
// 	}
