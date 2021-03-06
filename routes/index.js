var express = require('express');
var router = express.Router();


//variable para el controlador de las preguntas
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* Pagina inicial de la aplicacion */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[]});
});

router.get('/author', function(req,res){
  res.render('author', {errors:[]});
});

//autoload, llama a la funcion de quizController load
router.param('quizId', quizController.load);
//autoload, llama a la funcion de commentController load
router.param('commentId', commentController.load);

//Rutas para el inicio de sesion
router.get('/login', sessionController.new); //formulario de inicio de sesion
router.post('/login', sessionController.create); //crear sesion
router.get('/logout', sessionController.destroy); //logout de la sesion

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

module.exports = router;
