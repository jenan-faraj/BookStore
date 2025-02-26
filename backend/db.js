// 5. db.js (🔗 الاتصال بقاعدة البيانات)
// 📌 المسؤولية: إنشاء اتصال بـ PostgreSQL.
// 📌 إيش بيعمل؟

// يحتوي على إعدادات الاتصال بـ Database باستخدام pg Pool.
// يستدعي المتغيرات من .env حتى نضمن الأمان ونحافظ على بيانات الاتصال مخفية.
// إذا نجح الاتصال، يظهر "The database is connected successfully ✅".

require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
});

db.connect()
  .then(() => console.log("The database is connected successfully ✅"))
  .catch((err) => console.error("Error connecting to the database ❌", err));

module.exports = db;
