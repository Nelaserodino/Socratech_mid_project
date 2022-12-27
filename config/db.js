//requerimos la libreria mysql
var mysql      = require('mysql');
//configuramos la conexión a nuestra base de datos
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database:  'Play_back'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('conexión correcta');
});

//la exporto y la requiero en los archivos que necesito que conecten a la base de datos
module.exports = connection;