import { getConnection } from "./db.js";
import { generateError } from "../helpers.js";
import chalk from "chalk";

import util from "util";
import fs from "fs";

// const util = require("util");
// const fs = require("fs");
// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// const access = util.promisify(fs.access);

const getAllBeers = async () => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(`SELECT * FROM cervezas`);
    // console.log(rows)

    if (rows.length === 0) {
      throw generateError("No hay cervezas", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByID = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE id = ?`,
      id
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza con ese id", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByBrand = async (brand) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE brand = ?`,
      brand
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza de esa marca", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByCountry = async (country) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE country = ?`,
      country
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza de ese pais", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByStyle = async (style) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE style = ?`,
      style
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza de ese estilo", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByGraduation = async (graduation) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE graduation LIKE ?`,
      [`${graduation}%`]
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza de esa graduacion", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const addNewBeer = async (
  brand,
  name,
  style,
  graduation,
  country,
  score = "",
  comments = "",
  filename = ""
) => {
  let connection;

  try {
    connection = await getConnection();
    const [newBeer] = await connection.query(
      `INSERT INTO cervezas (brand, name, style, graduation, country, score, comments, img_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [brand, name, style, graduation, country, score, comments, filename]
    );

    console.log(chalk.green("Cerveza añadida con exito!"));

    return newBeer.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const addNewBeerComment = async (id, comment, rating) => {
  let connection;
  const FILE_PATH = "../frontend/public/beerComments.json";

  try {
    connection = await getConnection();

    //Obtenemos fecha y hora
    const fechaHora = new Date();

    const fecha = fechaHora.toLocaleDateString();

    const hora = fechaHora.toLocaleTimeString();

    console.log("fecha");
    console.log(fecha);
    console.log("hora");
    console.log(hora.split(":").slice(0, 2).join(":"));

    //Comprobamos si el fichero existe, sino lo creamos.
    let fileExists = false;

    try {
      await fs.promises.access(FILE_PATH, fs.constants.F_OK);
      fileExists = true;
    } catch (e) {
      fileExists = false;
    }

    //Añadimos una información inicial para que tenga sentido el archivo JSON
    if (!fileExists) {
      const initialData = { comments: [] };
      await fs.promises.writeFile(FILE_PATH, JSON.stringify(initialData));
      console.log("Archivo JSON creado con exito");
    }

    //Leemos el archivo para conservar lo que ya
    const data = await fs.promises.readFile(FILE_PATH, "utf8");
    const existingData = JSON.parse(data);

    //Añadir los comentarios al array de la bebida en cuestion
    const newComment = {
      id,
      comment,
      rating,
      timestamp: { date: fecha, time: hora.split(":").slice(0, 2).join(":") },
    };
    existingData.comments.push(newComment);

    //Volcamos todo a un string json
    await fs.promises.writeFile(
      FILE_PATH,
      JSON.stringify(existingData),
      "utf8"
    );
    console.log("Nuevo comentario añadido con exito!");

    // const createFile = async () => {
    //   fs.access(FILE_PATH, fs.F_OK, (e) => {
    //     if (e) {
    //       const initialData = { comments: [] };

    //       fs.writeFile(FILE_PATH, JSON.stringify(initialData), (writeErr) => {
    //         if (writeErr) {
    //           console.log(`Error al escribir el fichero: ${writeErr}`);
    //         } else {
    //           console.log("Archivo JSON creado con existo");
    //         }
    //       });
    //     }
    //   });
    // };

    // await createFile();

    // fs.readFile(FILE_PATH, (readErr, data) => {
    //   if (readErr) {
    //     console.log(`Error al leer el archivo: ${readErr}`);
    //   } else {
    //     const existingData = JSON.parse(data);
    //     const newComment = { id, comment, rating };
    //     existingData.comments.push(newComment);

    //     const updatedData = JSON.stringify(existingData);

    //     fs.writeFile(FILE_PATH, updatedData, (writeErr) => {
    //       if (writeErr) {
    //         console.log(
    //           `Error al escribir el archivo con nuevo comentario: ${writeErr}`
    //         );
    //       } else {
    //         console.log("Nuevo comentario escrito en el archivo");
    //       }
    //     });
    //   }
    // });

    // console.log(chalk.green("Cerveza añadida con exito!"));

    // return newBeer.insertId;
  } finally {
    if (connection) connection.release();
  }
};

export {
  getAllBeers,
  getBeerByID,
  getBeerByBrand,
  getBeerByCountry,
  getBeerByStyle,
  getBeerByGraduation,
  addNewBeer,
  addNewBeerComment,
};
