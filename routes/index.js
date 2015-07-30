var express = require('express');
var router = express.Router();


//variable para el controlador de las preguntas
var quizController = require('../controllers/quiz_controller');

/* Pagina inicial de la aplicacion */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req,res){
  res.render('author', {});
});

//autoload, llama a la funcion de quizController load
router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

module.exports = router;
