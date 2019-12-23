'use strict';
module.exports = (sequelize, DataTypes) => {
	const comments = sequelize.define(
		'comments',
		{
			idUser: DataTypes.INTEGER,
			idArticle: DataTypes.INTEGER,
			comment: DataTypes.TEXT
		},
		{}
	);
	comments.associate = function(models) {
		// associations can be defined here
		comments.belongsTo(models.articles, {
			foreignKey: 'idArticle',
			as: 'articles',
			sourceKey: 'id'
		});
	};
	return comments;
};
