"use strict";

import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";

/* Leer el fichero */
import fs from "fs";
import { StringDecoder } from "string_decoder";
StringDecoder.StringDecoder;
const decoder = new StringDecoder("utf-8");

const filename = "Cervezas - Listado Cervezas.csv";

const filePath = "../frontend/public/beer-data.json";

async function createJSONFunction() {
  console.log(chalk.blue(filename));

  const data = fs.readFileSync(filename);
  const decodeText = decoder.write(data);
  const lines = decodeText.split("\n");

  //Comprobamos que el fichero exista antes de borrar
  try {
    if (fs.existsSync(filePath)) {
      //Si existe borramos el fichero
      fs.unlinkSync(filePath);
      console.log(chalk.green("Archivo borrado con exito"));
    }
  } catch (e) {
    console.log(chalk.red(`El fichero no existe`));
  }

  // for (let i = 1; i < lines.length; i++) {
  for (let i = 1; i < lines.length; i++) {
    const [
      marca,
      nombre,
      estilo,
      graduacion,
      nacionalidad,
      nota,
      comentarios,
      imagen,
    ] = lines[i].split(",");

    //Escribimos el fichero
    fs.writeFile(filePath, '{\n\t"data:": [', (e) => {
      if (e) {
        console.log(chalk.red(e));
      }
    });

    const beerData = `{
      \"id\":\"${i}\",
      \"brand\":\"${marca}\", 
      \"name\":\"${nombre}\", 
      \"style\":\"${estilo}\", 
      \"graduation\":\"${graduacion}\", 
      \"country\":\"${nacionalidad}\", 
      \"score\":\"${nota}\", 
      \"comments\":\"${comentarios}\", 
      \"img_file\":\"${imagen}\"
    } ${i < lines.length ? "," : ""}`;

    // console.log(beerData);

    //Escribimos el fichero
    fs.appendFile(filePath, beerData, (e) => {
      if (e) {
        console.log(chalk.red(e));
      }
    });
  }

  //Escribimos el fichero
  fs.appendFile(filePath, "\n\t]\n}", (e) => {
    if (e) {
      console.log(chalk.red(e));
    }
  });
}

createJSONFunction();
