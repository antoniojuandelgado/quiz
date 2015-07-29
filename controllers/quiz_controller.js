//Controlador para las preguntas
// GET /quizes/question
var models = require('../models/models.js');

//GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		console.log("Metodo show recibe como parametro "+quizes);
		res.render('quizes/index.ejs', {quizes:quizes});
	})
};


// GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		console.log("Metodo show recibe como parametro "+req.params.quizId+" y tambien "+quiz);
		res.render('quizes/show',{quiz:quiz});
	})
};

//GET /quizes/:id/answer
exports.answer = function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', {quiz:quiz, respuesta: 'Correcto'});
		}
		else{
			res.render('quizes/answer', {quiz:quiez, respuesta: 'Incorrecto'});
		}
	})
};
