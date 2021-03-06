var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite DATABASE_URL= sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//cargamos sequelize
var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd, 
	{dialect: protocol,
		protocol: protocol,
		port: port,
		host: host,
		storage: storage,
		omitNull:true
	});

//importamos la definicion de la tabla que hicimos antes
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

//Definicion de la tabla comentarios
var comment_path= path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

//ahora la relacion con la pregunta quiz y los comentarios
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//ahora exportamos la definicion de la tabla
exports.Quiz = Quiz;
//ahora exportamos la tabla Comentario
exports.Comment = Comment;

//sincronizamos la tabla para el modelo
sequelize.sync().then(function(){
	//una vez creada la tabla, se ejecuta esto
	Quiz.count().then(function(count){
		if(count === 0){ //es decir, la tabla aun está vacía
			Quiz.bulkCreate(
				[{pregunta: 'Capital de Italia', respuesta: 'Roma', tematica: 'humanidades'},
				 {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tematica: 'humanidades'}
				 ]).then(function(){console.log('Base de datos inicializada')});
		};
	});
});