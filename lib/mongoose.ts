import mogoose, { Mongoose } from "mongoose";

import logger from "./logger";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

/*
 * мы будем использовать server actions, чтобы всё это работало, а server actions не запоминают  свой предыдущий вызов,
 * в отличие от обычного сервера, который всегда отслеживает подключение к MongoDB.
 * По этой причине мы хотим кэшировать соединение, чтобы просто подключаться к нему при каждом вызове серверного действия.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mogoose: MongooseCache;
}

/*
 * если кэшированная версия не существует, то есть если кэш не настроен, мы присвоим переменной кэша значение global.mongus, равное объекту { conn: null, promise: null }
 * Мы делаем это, потому что функции Next. js можно вызывать несколько раз.
 * особенно в процессе разработки.
 * Таким образом, без кэширования при каждом вызове могло бы создаваться новое соединение с базой данных, что привело бы к исчерпанию ресурсов и потенциальному достижению * * лимита соединений.
 * Этот шаблон синглтона позволяет нам объявить соединение один раз и поддерживать его единственный экземпляр
 */

let cached = global.mogoose;
if (!cached) {
  cached = global.mogoose = { conn: null, promise: null };
}

/*
 * установим реальное соединение, указав новую функцию const dbconnect.
 * Таким образом, это самый простой способ всегда иметь доступ к нашей базе данных MongoDB
 * без необходимости повторно устанавливать соединение при каждом вызове server actions.
 */

const dbConnect = async (): Promise<Mongoose | null> => {
  if (cached.conn) {
    logger.info("Using existing mongoose connection");
    return cached.conn;
  }
  if (!cached.conn) {
    cached.promise = mogoose
      .connect(MONGODB_URI, { dbName: "MyStackOverflow" })
      .then((result) => {
        logger.info("Connect to MongoDB...");
        return result;
      })
      .catch((error) => {
        logger.error(" Error connecting MongoDB...", error);
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
