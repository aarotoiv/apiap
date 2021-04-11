const mysql = require('mysql2/promise');
require('dotenv').config();

let connection = null;

module.exports = {
  initializeConnection: async () => {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'secret',
      database: process.env.MYSQL_DATABASE
    });
  },
  findDroneById: async (droneId) => {
    const [rows] = await connection.execute(
      `SELECT * FROM drone WHERE drone.id = ?`,
      [ droneId ]
    );
    console.log(rows);
    return rows;
  },
  findUserById: async (userId) => {
    const [rows] = await connection.execute(
      `SELECT * FROM user WHERE user.id = ?`,
      [ userId ]
    );
    return rows;
  },
  findDroneUser: async (droneId) => {
    const [rows] = await connection.execute(
      `SELECT user.fname, user.lname, user.username 
      FROM drone INNER JOIN user
      ON drone.user_id = user.id
      WHERE drone.id = ?`,
      [ droneId ]
    );
    return rows;
  },
  findDroneImages: async (droneId) => {
    const [rows] = await connection.execute(
      `SELECT image.name as image_name, image.description, image.id as image_id, user.username, user.id as user_id
      FROM image
      INNER JOIN drone_usage
      ON drone_usage.id = image.usage_id
      INNER JOIN user
      ON drone_usage.user_id = user.id
      WHERE drone_usage.drone_id = ?`,
      [ droneId ]
    );
    return rows;
  },
  findImageAnalysis: async (imageId) => {
    const [rows] = await connection.execute(
      `SELECT drone.name as drone_name, drone.brand as drone_brand, drone.model as drone_model, user.username,
      image.name as image_name, image.description as image_desc, image.longitude, image.latitude, image.timestamp
      FROM image
      INNER JOIN drone_usage 
      ON image.usage_id = drone_usage.id
      INNER JOIN drone
      ON drone_usage.drone_id = drone.id
      INNER JOIN user
      ON drone_usage.user_id = user.id
      WHERE image.id = ?`,
      [ imageId ]
    );
    return rows;
  },
  addUser: async (user) => {
    const [rows] = await connection.execute(
      `INSERT INTO user (fname, lname, username, password, token, droning)
      VALUES (?, ?, ?, ?, ?, 0)`,
      [ user.fname, user.lname, user.username, user.password, user.token ]
    );
    return rows;
  },
  addDrone: async (drone) => {
    const [rows] = await connection.execute(
      `INSERT INTO drone (name, brand, model, description)
      VALUES (?, ?, ?, ?)`,
      [ drone.name, drone.brand, drone.model, drone.description ]
    );
    return rows;
  }
}
