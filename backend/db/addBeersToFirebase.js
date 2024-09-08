// Para añadir las nuevas cervezas a firebase, tenemos que copiar el fichero beer-data.json que se haya generado en frontend en la carpeta de backend (o cambiar la direccion desde createJSON.js) y en el cmd poner el siguiente comando una vez estemos en este directorio: node addBeersToFirebase.js

import admin from "firebase-admin";
import fs from "fs/promises"; // Utiliza fs/promises para operaciones asíncronas
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta del archivo actual y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo serviceAccountKey.json
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

// Inicializar Firebase con las credenciales del archivo serviceAccountKey.json
async function initializeFirebase() {
  try {
    const serviceAccount = JSON.parse(
      await fs.readFile(serviceAccountPath, "utf8")
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    return admin.firestore(); // Devuelve una instancia de Firestore
  } catch (err) {
    console.error("Error al inicializar Firebase:", err);
    throw err;
  }
}

// Ruta al archivo JSON con los datos a subir
const jsonFilePath = path.join(__dirname, "../beer-data.json");

// Función para subir datos JSON a Firestore
async function uploadJSONtoFirestore(db) {
  try {
    const jsonData = JSON.parse(await fs.readFile(jsonFilePath, "utf8")).data;

    // Imprimir los datos leídos del archivo JSON (opcional)
    // console.log("Datos leídos del archivo JSON:", jsonData);

    const batch = db.batch();

    jsonData.forEach((beer) => {
      // Asume que cada cerveza tiene un campo 'id' único
      const docRef = db.collection("beers").doc(beer.ID);
      batch.set(docRef, beer);
    });

    await batch.commit();
    console.log("Datos subidos exitosamente a Firestore");
  } catch (err) {
    console.error("Error al subir datos a Firestore:", err);
  }
}

// Inicializar Firebase y subir los datos a Firestore
(async () => {
  try {
    const db = await initializeFirebase();
    if (db) {
      await uploadJSONtoFirestore(db);
    }
  } catch (error) {
    console.error("Error general:", error);
  }
})();
