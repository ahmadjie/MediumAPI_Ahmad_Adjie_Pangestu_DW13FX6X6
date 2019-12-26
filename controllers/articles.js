const Model = require('../models');
const Articles = Model.articles;
const Category = Model.categories;
const User = Model.users;
const Comments = Model.comments;

//show all articles
exports.index = (req, res) => {
	Articles.findAll({
		attributes: {
			exclude: [ 'idCategory', 'updatedAt', 'idUser' ]
		},
		include: [
			{
				model: Category,
				as: 'Category',
				attributes: {
					exclude: [ 'id', 'createdAt', 'updatedAt' ]
				}
			},
			{
				model: User,
				as: 'Created_By',
				attributes: {
					exclude: [ 'id', 'fullname', 'email', 'password', 'is_active', 'createdAt', 'updatedAt' ]
				}
			}
		]
	}).then((data) => res.send(data));
};

//show 10 last articles
exports.lastArticles = (req, res) => {
	Articles.findAll({
		attributes: {
			exclude: [ 'idCategory', 'updatedAt' ]
		},
		include: [
			{
				model: Category,
				as: 'Category',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				}
			},
			{
				model: User,
				as: 'Created_By',
				attributes: {
					exclude: [ 'id', 'fullname', 'email', 'password', 'is_active', 'createdAt', 'updatedAt' ]
				}
			}
		],
		order: [ [ 'createdAt', 'DESC' ] ],
		limit: 4
	}).then((data) => res.send(data));
};

//add article
exports.addArticle = (req, res) => {
	const { title, content, image, idCategory } = req.body;
	Articles.create({
		title: title,
		content: content,
		image: image,
		idCategory: idCategory,
		//tokenUserId dapet dari middleware
		idUser: tokenUserId
	}).then((data) =>
		res.send({
			message: 'success',
			data
		})
	);
};

//update article
exports.updateArticle = (req, res) => {
	const { id } = req.params;
	const dataUpdate = {
		title: req.body.title,
		content: req.body.content,
		image: req.body.image,
		idCategory: req.body.idCategory
	};
	Articles.findAll({
		where: { idUser: tokenUserId }
	}).then((data) => {
		if (data) {
			Articles.update(dataUpdate, {
				where: {
					id: id,
					idUser: tokenUserId
				}
			})
				.then((data) => {
					if (data[0] === 1) {
						res.status(200).send({
							message: 'Success Update Article',
							data
						});
					} else {
						res.status(403).send({
							message: 'This is not your article'
						});
					}
				})
				.catch((err) => {
					res.send({
						message: err.message
					});
				});
		} else {
			res.status(403).send({
				message: 'This is not your articles'
			});
		}
	});
};

//delete article
exports.deleteArticle = (req, res) => {
	const { id } = req.params;
	Articles.findAll({
		where: { idUser: tokenUserId }
	}).then((data) => {
		if (data) {
			Articles.destroy({
				where: {
					id: id,
					idUser: tokenUserId
				}
			}).then((data) => {
				if (data === 1) {
					res.status(200).send({
						message: 'Success Delete Article',
						data
					});
				} else {
					res.status(403).send({
						message: 'This is not your article'
					});
				}
			});
		} else {
			res.status(403).send({
				message: 'This is not your article Article'
			});
		}
	});
};

//show articles by category
exports.showArticlesByCategory = (req, res) => {
	const { id } = req.params;
	Articles.findAll({
		attributes: {
			exclude: [ 'idUser', 'idCategory', 'updatedAt' ]
		},
		include: [
			{
				model: Category,
				as: 'Category',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				},
				where: {
					id
				}
			},
			{
				model: User,
				as: 'Created_By',
				attributes: {
					exclude: [ 'id', 'fullname', 'email', 'password', 'is_active', 'createdAt', 'updatedAt' ]
				}
			}
		]
	}).then((data) => res.send(data));
};

//show article by id
exports.showArticleById = (req, res) => {
	const { id } = req.params;
	Articles.findOne({
		where: {
			id
		},
		attributes: {
			exclude: [ 'updatedAt', 'idCategory', 'idUser' ]
		},
		include: [
			{
				model: Category,
				as: 'Category',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				}
			},
			{
				model: User,
				as: 'Created_By',
				attributes: {
					exclude: [ 'id', 'fullname', 'email', 'password', 'is_active', 'createdAt', 'updatedAt' ]
				}
			},
			{
				model: Comments,
				as: 'comments',
				attributes: {
					exclude: [ 'idUser', 'idArticle' ]
				}
			}
		]
	}).then((data) => res.send(data));
};
