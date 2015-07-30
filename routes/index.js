var express = require('express');
var router = express.Router();


//variable para el controlador de las preguntas
var quizController = require('../controllers/quiz_controller');

/* Pagina inicial de la aplicacion */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[]});
});

router.get('/author', function(req,res){
  res.render('author', {errors:[]});
});

//autoload, llama a la funcion de quizController load
router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

module.exports = router;
