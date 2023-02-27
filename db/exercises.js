const { generateError } = require('../helpers');
const { getConnection } = require('./db');

// Función que crea un ejercicio
const createExercise = async (
  userId,
  name,
  description,
  category,
  img = ''
) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    INSERT INTO exercises (idUser, name, description, category, img)
    VALUES(?,?,?,?,?)
    `,
      [userId, name, description, category, img]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};
//Función que devuelve información de un ejercicio
const getExerciseById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    SELECT * FROM exercises WHERE id = ?
    `,
      [id]
    );
    if (result.lenght === 0) {
      generateError(`El ejercicio con id: ${id} no existe`, 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//Función que lista todos los ejercicios
const getAllExercises = async (category = '') => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    SELECT * FROM exercises WHERE category LIKE ? ORDER BY createdAt
    `,
      [`${category}%`]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

// Función que borra un ejercicio
const deleteExerciseById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
    DELETE FROM exercises WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = {
  createExercise,
  getExerciseById,
  getAllExercises,
  deleteExerciseById,
};
