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
				as: 'Created By',
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
				as: 'Created By',
				attributes: {
					exclude: [ 'id', 'fullname', 'email', 'password', 'is_active', 'createdAt', 'updatedAt' ]
				}
			}
		],
		order: [ [ 'createdAt', 'DESC' ] ],
		limit: 10
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
	Articles.update(req.body, {
		where: {
			id
		}
	}).then((data) => {
		res.send({
			message: 'Success Update Article',
			data
		});
	});
};

//delete article
exports.deleteArticle = (req, res) => {
	const { id } = req.params;
	Articles.destroy({
		where: {
			id
		}
	}).then((data) => {
		res.send({
			message: 'Delete Succes',
			data
		});
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
				as: 'Created By',
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
			exclude: [ 'createdAt', 'updatedAt', 'idCategory', 'idUser' ]
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
				as: 'Created By',
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
