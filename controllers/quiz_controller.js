//Controlador para las preguntas
// GET /quizes/question
var models = require('../models/models.js');

//Autoload
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}
			else{
				next(new Error('No existe quizId='+quizId));
			}
		}).catch(function(error){next(error);});
};

//GET / quizes
exports.index = function(req,res){
	var filtro = req.query.search;
	var condicion = ('%' + filtro + '%').replace(/ /g,'%');
	if (req.query.search) {
		models.Quiz.findAll({
			where: ["pregunta like ?", condicion],
			order: [['pregunta', 'ASC']]}
		).then(function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}).catch(function(error) {next(error);});
	}
	else{
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', {quizes: quizes, errors: []});
		}).catch(function(error) {next(error);});
	}
};

//POST /quizes/create
exports.create= function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);

	//guarda en la BD los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes'); //redireciona para que se vea la pregunta guardada
	})
};

// GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build(
			{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
	res.render('quizes/new', {quiz: quiz});
};

// GET /quizes/:id
exports.show = function(req, res){
		res.render('quizes/show',{quiz:req.quiz});
};

//GET /quizes/:id/answer
exports.answer = function(req,res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado='Correcto';
	}
	res.render('quizes/answer',{quiz:req.quiz, respuesta:resultado});
};
