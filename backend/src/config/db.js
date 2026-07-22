import mongoose from "mongoose";

export const connectDB = async (uri) => {
  if (!uri) {
    throw new Error(
      "MONGODB_URI no está definida. Revisa tu archivo .env en la raíz del monorepo."
    );
  }

  mongoose.connection.on("connected", () => {
    const dbName = mongoose.connection.db?.databaseName || "desconocida";
    console.log(`MongoDB conectado — Base de datos: ${dbName}`);
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error de conexión MongoDB:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB desconectado");
  });

  try {
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (error) {
    console.error("ERROR: FALLO DE CONEXIÓN A MONGODB ATLAS");
    console.error(`Causa: ${error.message}`);
    console.error("Posibles soluciones:");
    console.error("1. Verifica que MONGODB_URI sea correcta en .env");
    console.error("2. Verifica que tu IP esté en Network Access de Atlas");
    console.error("3. Verifica que el cluster esté activo (no pausado)");
    console.error("4. Verifica usuario y contraseña del connection string");
    process.exit(1);
  }
};