const Model = require('../models');
const Articles = Model.articles;
const Category = Model.categories;
const User = Model.users;
const Comments = Model.comments;

exports.findArticlesByUser = (req, res) => {
	const { id } = req.params;

	User.findOne({
		where: {
			id
		}
	}).then((data) => {
		Articles.findAll({
			where: {
				idUser: data.id
			},
			include: [
				{
					model: Category,
					as: 'Category',
					attributes: {
						exclude: [ 'createdAt', 'updatedAt' ]
					}
				}
			],
			attributes: {
				exclude: [ 'idCategory' ]
			}
		}).then((result) => {
			res.send({
				User: result
			});
		});
	});
};
