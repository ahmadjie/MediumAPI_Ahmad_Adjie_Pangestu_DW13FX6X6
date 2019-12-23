'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('comments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			idUser: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				},
				onDelete: 'cascade',
				onUpdate: 'cascade'
			},
			idArticle: {
				type: Sequelize.INTEGER,
				references: {
					model: 'articles',
					key: 'id'
				},
				onDelete: 'cascade',
				onUpdate: 'cascade'
			},
			comment: {
				type: Sequelize.TEXT
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('comments');
	}
};
