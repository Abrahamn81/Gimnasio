require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileupload = require('express-fileupload');

// Importamos las funciones de usuario mediante destructuring
const {
  newUserController,
  getUserController,
  loginController,
  editUser,
  //deleteUser,
} = require('./controllers/users');

// Importamos las funciones de ejercicios mediante destructuring
const {
  getExercisesController,
  newExerciseController,
  getSingleExerciseController,
  editExerciseController,
  deleteExerciseController,
} = require('./controllers/exercises');

// Importamos las funciones de likes mediante destructuring
const { newLikeController, deleteLike } = require('./controllers/likes');

// Importamos las funciones de autentificación de usuario y de admin
const { authUser } = require('./middlewares/auth');
const { isAdmin } = require('./middlewares/isAdmin');
const { canEditUser } = require('./middlewares/canEditUser');

//
const app = express();
//Para que express procese el body de las peticiones(que al enviar un objeto con en el postman la api pueda procesar esa información que está en un .json)
app.use(express.json());
//Middlewar que permite deserializar un body en formato "form-data" creando la propiedad "body" y "files" en el objeto "request"
app.use(fileupload());
//
app.use(morgan('dev'));

//Rutas de usuario
app.post('/user', newUserController);
app.get('/user/:id', authUser, getUserController);
app.post('/login', loginController);
app.put('/user/:id', authUser, canEditUser, editUser);
//app.delete('/user/:id', authUser, deleteUser);

//Rutas de ejercicios
app.post('/exercise', authUser, isAdmin, newExerciseController);
app.get('/exercise', getExercisesController);
app.get('/exercise/:id', getSingleExerciseController);
app.put('/exercise/:id', authUser, isAdmin, editExerciseController);
app.delete('/exercise/:id', authUser, isAdmin, deleteExerciseController);

//Rutas de likes
app.post('/exercises/:idExercise/likes', authUser, newLikeController);
app.delete('/exercises/:idExercise/likes', authUser, deleteLike);

//Middleware de 404 (no se ha encontrado la ruta)
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

//Middleware de gestión de errores
// añadimos al error la propiedad httpStatus. Es para asociar un error a un código de error.
// Si no hay un código de error que ponga el error 500
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//Lanzamos app
app.listen(3000, () => {
  console.log('Servidor funcionando 😎');
});
