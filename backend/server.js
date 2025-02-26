// 4. server.js (🚀 تشغيل السيرفر)
// 📌 المسؤولية: تشغيل الـ Express Server وتوصيل كل الأجزاء مع بعض.
// 📌 إيش بيعمل؟

// يجهز Middleware زي express.json() و cors().
// يستدعي Routes ويعطيها prefix

const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/books", bookRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
