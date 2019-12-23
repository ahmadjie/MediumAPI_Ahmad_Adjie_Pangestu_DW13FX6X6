'use strict';
module.exports = (sequelize, DataTypes) => {
	const articles = sequelize.define(
		'articles',
		{
			title: DataTypes.STRING,
			content: DataTypes.TEXT,
			image: DataTypes.STRING,
			idCategory: DataTypes.INTEGER,
			idUser: DataTypes.INTEGER
		},
		{}
	);
	articles.associate = function(models) {
		// associations can be defined here
		//belongsto untuk satu
		articles.belongsTo(models.categories, {
			foreignKey: 'idCategory',
			as: 'Category',
			sourceKey: 'id'
		});
		articles.belongsTo(models.users, {
			foreignKey: 'idUser',
			as: 'Created By',
			sourceKey: 'id'
		});
		articles.hasMany(models.comments, { foreignKey: 'idArticle' });
	};
	return articles;
};
