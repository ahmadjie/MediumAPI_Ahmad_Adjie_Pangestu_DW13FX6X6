'use strict';
module.exports = (sequelize, DataTypes) => {
	const follows = sequelize.define(
		'follows',
		{
			followingId: DataTypes.INTEGER,
			followerId: DataTypes.INTEGER
		},
		{}
	);
	follows.associate = function(models) {
		// associations can be defined here
		follows.belongsTo(models.users, {
			foreignKey: 'followingId',
			as: 'Following',
			sourceKey: 'id'
		});
	};
	return follows;
};
