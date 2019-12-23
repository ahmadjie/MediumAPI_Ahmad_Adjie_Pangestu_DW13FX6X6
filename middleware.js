const jwt = require('jsonwebtoken');

const secret = 'asep';

exports.checkAuth = (req, res, next) => {
	//get token lewat header
	const getToken = req.headers['authorization'];

	//pisahkan bearer dengan token menggunakan split
	//jadi token menajadi array ["bearer", "randomtoken"]
	const token = getToken && getToken.split(' ')[1];

	//jika token kosong
	if (token === null) {
		res.status(401).send({
			message: err.message
		});
	}

	//cek token
	jwt.verify(token, secret, (err, user) => {
		if (err) {
			return res.status(403).send({
				message: err.message
			});
		}

		//user.user.id
		//user pertama diambil dari parameter verify kalo userId diambil dari login bagian jwt.sign(userId)

		tokenUserId = user.userId;
		next();
	});
};
