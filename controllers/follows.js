const Model = require('../models');
const Follow = Model.follows;
const User = Model.users;

exports.addFollow = (req, res) => {
	const { followingId } = req.body;
	if (followingId !== tokenUserId) {
		Follow.create({
			followingId: followingId,
			followerId: tokenUserId
		}).then((data) => {
			Follow.findOne({
				attributes: [ 'id' ],
				include: [
					{
						model: User,
						as: 'Following',
						attributes: [ 'id', 'email' ]
					}
				],
				where: {
					id: data.id
				}
			}).then((result) => {
				res.send({
					message: result
				});
			});
		});
	} else {
		res.send({
			message: "Can't follow yourself"
		});
	}
};
