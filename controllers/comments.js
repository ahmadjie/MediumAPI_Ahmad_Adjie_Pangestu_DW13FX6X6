const Model = require('../models');
const Articles = Model.articles;
const Category = Model.categories;
const User = Model.users;
const Comment = Model.comments;

exports.addComment = (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;
	Comment.create({
		idUser: tokenUserId,
		idArticle: id,
		comment: comment
	}).then((comment) => {
		Comment.findOne({
			attributes: [ 'id', 'comment' ],
			include: [
				{
					model: Articles,
					as: 'articles',
					attributes: [ 'id', 'title' ]
				}
			],
			where: {
				id: comment.id
			}
		}).then((data) => {
			res.send(data);
		});
	});
};

exports.editComment = (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;
	Comment.findOne({
		where: { id: id, idUser: tokenUserId }
	}).then((data) => {
		if (data) {
			Comment.update(
				{ comment },
				{
					where: { id: id, idUser: tokenUserId }
				}
			).then(() => {
				Comment.findOne({
					attributes: [ 'id', 'comment' ],
					include: [
						{
							model: Articles,
							as: 'articles',
							attributes: [ 'id', 'title' ]
						}
					],
					where: {
						id: req.params.id
					}
				}).then((responses) => {
					res.send(responses);
				});
			});
		} else {
			res.status(403).send({
				message: 'This is not your comment'
			});
		}
	});
};

exports.deleteComment = (req, res) => {
	const { id } = req.params;
	Comment.findOne({
		where: { id: id, idUser: tokenUserId }
	}).then((data) => {
		if (data) {
			Comment.destroy({
				where: {
					id
				}
			}).then((responses) => {
				res.status(200).send({
					message: 'Delete Success',
					responses
				});
			});
		} else {
			res.status(403).send({
				message: 'This is not your comment'
			});
		}
	});
};

exports.getAllComments = (req, res) => {
	const { id } = req.params;
	Comment.findAll({
		attributes: {
			exclude: [ 'idUser', 'idArticle' ]
		},
		include: [
			{
				model: Articles,
				as: 'articles',
				attributes: {
					exclude: [ 'idUser', 'idArticle', 'updatedAt', 'content', 'image', 'createdAt' ]
				},
				where: {
					id
				}
			}
		]
	}).then((data) => {
		res.status(200).send(data);
	});
};
