var path = require('path');

//cargamos sequelize
var Sequelize = require('sequelize');

//ahora utilizamos la base de dato SQLite
var sequelize = new Sequelize(null, null, null,{dialect: "sqlite", storage: "quiz.sqlite"});

//importamos la definicion de la tabla que hicimos antes
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//ahora exportamos la definicion de la tabla
exports.Quiz = Quiz;

//sincronizamos la tabla para el modelo
sequelize.sync().success(function(){
	//una vez creada la tabla, se ejecuta esto
	Quiz.count().success(function(count){
		if(count === 0){ //es decir, la tabla aun está vacía
			Quiz.create({pregunta: 'Capital de Italia',
						 respuesta: 'Roma'
						})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});