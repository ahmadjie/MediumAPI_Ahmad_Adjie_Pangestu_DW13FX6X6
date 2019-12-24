'use strict';
module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define(
		'users',
		{
			fullname: DataTypes.STRING,
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			is_active: DataTypes.INTEGER
		},
		{}
	);
	users.associate = function(models) {
		// associations can be defined here

		users.hasMany(models.articles, {
			foreignKey: 'idUser',
			as: 'Articles',
			targetKey: 'name'
		});
	};
	return users;
};
