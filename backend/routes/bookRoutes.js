// 3. routes/bookRoutes.js (🌍 الـ Routes)
// 📌 المسؤولية: تعريف المسارات (Endpoints) الخاصة بالـ API.
// 📌 إيش بيعمل؟

// يحدد المسارات اللي المستخدم ممكن يطلبها مثل:
// POST /books → لإضافة كتاب جديد.
// GET /books → لجلب كل الكتب.
// PUT /books/:id → لتعديل كتاب معين.
// PUT /books/delete/:id → لحذف كتاب بطريقة Soft Delete.
// يربط كل Route بوظيفة موجودة في Controller.

const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.put("/:id", bookController.updateBook);
router.put("/delete/:id", bookController.softDeleteBook);

module.exports = router;
