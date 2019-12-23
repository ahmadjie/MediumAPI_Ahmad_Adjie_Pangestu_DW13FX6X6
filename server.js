const express = require('express');
require('express-group-routes');
const categoriesController = require('./controllers/categories');
const articlesController = require('./controllers/articles');
const commentsController = require('./controllers/comments');
const authController = require('./controllers/auth');
const middleware = require('./middleware');

const app = express();
const port = 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.group('/api/v1', (router) => {
	//get all categories
	router.get('/categories', categoriesController.index);

	//get category by id
	router.get('/category/:id', categoriesController.showCategory);

	//post category
	router.post('/category', categoriesController.addCategory);

	//get all articles
	router.get('/articles', articlesController.index);
	router.get('/article/:id', articlesController.showArticleById);

	//get articles by category
	router.get('/category/:id/articles', articlesController.showArticlesByCategory);

	//get lastest articles
	router.get('/articles/lastest', articlesController.lastArticles);
	//post article
	router.post('/article', middleware.checkAuth, articlesController.addArticle);
	//update article
	router.patch('/article/:id', middleware.checkAuth, articlesController.updateArticle);
	//delete article
	router.delete('/article/:id', middleware.checkAuth, articlesController.deleteArticle);

	//comments
	router.get('/article/:id/comment', commentsController.getAllComments);
	router.post('/article/:id/comment', middleware.checkAuth, commentsController.addComment);
	router.put('/article/:id/comment', middleware.checkAuth, commentsController.editComment);
	router.delete('/article/:id/comment', middleware.checkAuth, commentsController.deleteComment);

	//login & register
	router.post('/login', authController.login);
	router.post('/register', authController.register);
});

app.listen(port, () => console.log(`Run on port ${port}`));
