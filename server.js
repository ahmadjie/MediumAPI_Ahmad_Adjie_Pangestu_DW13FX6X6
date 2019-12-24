const express = require('express');
require('express-group-routes');
const categoriesController = require('./controllers/categories');
const articlesController = require('./controllers/articles');
const commentsController = require('./controllers/comments');
const authController = require('./controllers/auth');
const followController = require('./controllers/follows');
const userController = require('./controllers/users');
const middleware = require('./middleware');

const app = express();
const port = 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.group('/api/v1', (router) => {
	//task1
	//get all categories
	router.get('/categories', categoriesController.index);
	//post category
	router.post('/category', categoriesController.addCategory);
	//get category by id
	router.get('/category/:id', categoriesController.showCategory);
	//task2
	//get all articles
	router.get('/articles', articlesController.index);
	//get lastest articles
	router.get('/articles/lastest', articlesController.lastArticles);
	//task3
	//get articles by category
	router.get('/category/:id/articles', articlesController.showArticlesByCategory);
	//task4
	//create update delete article
	router.post('/article', middleware.checkAuth, articlesController.addArticle);
	router.patch('/article/:id', middleware.checkAuth, articlesController.updateArticle);
	router.delete('/article/:id', middleware.checkAuth, articlesController.deleteArticle);
	//task 5
	router.get('/article/:id', articlesController.showArticleById);
	//task6
	// crud comments
	router.get('/article/:id/comment', commentsController.getAllComments);
	router.post('/article/:id/comment', middleware.checkAuth, commentsController.addComment);
	router.put('/article/:id/comment', middleware.checkAuth, commentsController.editComment);
	router.delete('/article/:id/comment', middleware.checkAuth, commentsController.deleteComment);
	//task 7
	//follows
	router.get('/follow', middleware.checkAuth, followController.addFollow);
	//task 9
	//users
	router.get('/user/:id/articles', userController.findArticlesByUser);
	//task 10 & 11
	//login & register
	router.post('/login', authController.login);
	router.post('/register', authController.register);
});

app.listen(port, () => console.log(`Run on port ${port}`));
