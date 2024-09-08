// Para generar un fichero nuevo nos colocamos en este directorio y tenemos que hacer el comando "node createJSON.js" de esta manera se nos generará un fichero JSON en la carpeta que tengamos puesta en "jsonFilePath" (frontend en este caso)

import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

// Rutas de los archivos de entrada y salida

import { fileURLToPath } from "url";

// Obtener la ruta del archivo actual y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, "../Cervezas - Listado Cervezas.csv");
const jsonFilePath = path.join(__dirname, "../beer-data.json");

async function createJSONFunction() {
  try {
    // Leer el archivo CSV utilizando csv-parser
    const beerData = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        // Procesar cada fila del CSV y ajustar los campos según sea necesario
        const beer = {
          ID: row.ID,
          MARCA: row.MARCA,
          NOMBRE: row.NOMBRE,
          ESTILO: row.ESTILO,
          GRADUACION: row.GRADUACIÓN,
          NACIONALIDAD: row.NACIONALIDAD,
          NOTA: row.NOTA,
          COMENTARIOS: row.COMENTARIOS,
          IMAGEN: row.IMAGEN_LOCAL || "", // Asegúrate de manejar campos vacíos
        };
        beerData.push(beer);
      })
      .on("end", () => {
        // Escribir el archivo JSON una vez se ha terminado de procesar el CSV
        fs.promises
          .writeFile(
            jsonFilePath,
            JSON.stringify({ data: beerData }, null, 2),
            "utf8"
          )
          .then(() => {
            console.log(`Archivo JSON generado con éxito en: ${jsonFilePath}`);
          })
          .catch((err) => {
            console.error("Error al escribir el archivo JSON:", err);
          });
      });
  } catch (err) {
    console.error("Error al leer el archivo CSV:", err);
  }
}

createJSONFunction();
