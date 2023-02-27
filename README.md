# Gimnasio API

Aplicación para organizar internamente los entrenamientos en un gimnasio.

## Instalar

- Crear una base de datos vacía en una instancia de MySQL local.

- Guardar el archivo .env.example como .env y cubrir los datos necesarios.

- Ejecutar npm run initDB para crear las tablas necesarias en la base de datos anteriormente creada.

- Ejecutar npm run dev o npm start para lanzar el servidor.

## Entidades

- user:

  - id
  - name
  - email
  - password
  - admin
  - createdAt
  - modifiedAt

- exercises:

  - id
  - name
  - category
  - idUser
  - img
  - description
  - createdAt
  - modifiedAt

  - likes:

  - id
  - idUser
  - idExcercise
  - createdAt

Extra

- Favourites:

  - id
  - idUser
  - idExcercise
  - createdAt

## Endpoints

### Usuarios:

- POST [/users] - Registro de usuario.✅
- POST [/users/login] - Login de usuario (devuelve token).✅
- GET [/users/:id] - Devuelve información del usuario del token. TOKEN ✅
  Opcional
- PUT [/users/:id] - Editar nombre de usuario o el email. TOKEN ✅
- DELETE [/users/:id] - Eliminar un usuario. TOKEN

### Ejercicios User:

- GET [/exercises] - Lista todos los ejercicios.✅
- GET [/exercises/:idExercises] - Devuelve información de un ejercicio concreto.✅
- POST [/exercises/:idExercises/likes] - Añade un like a un ejercicio. TOKEN ✅
- GET [/exercises?category=espalda] - Devuelve información de una categoria (se hace en el GET de listar ejercicios) ✅
- DELETE [/exercises/:idExercises/likes] - Deshace un like de un ejercicio. TOKEN ✅

Opcional

- GET [/exercises/:idExercises/favourites] - Devuelve información de los ejercicios favoritos.
- POST [/exercises/:idExercises/favourites] - Añade un ejercicio a la lista de favoritos. TOKEN

### Ejercicios User admin:

- POST [/exercises] - Permite crear un ejercicio. TOKEN ✅
- DELETE [/exercises/:id] - Borra un ejercicio solo si eres admin. TOKEN ✅
