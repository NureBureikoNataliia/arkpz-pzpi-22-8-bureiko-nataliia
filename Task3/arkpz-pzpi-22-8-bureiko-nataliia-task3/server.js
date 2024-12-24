const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const { getShowcaseProduct, setShowcaseProduct } = require("./showcaseProduct");
const verifyToken = require("./authMiddleware");

// Підключення до всіх маршрутів
const products = require("./routes/productRoutes");
const admins = require("./routes/adminRoutes");
const surveys = require("./routes/surveyRoutes");
const questions = require("./routes/questionRoutes");
const answers = require("./routes/answerRoutes");
const categories = require("./routes/categoryRoutes");
const priorities = require("./routes/priorityRoutes");
const awsRoutes = require("./routes/awsRoutes");
const clients = require("./routes/clientRoutes")
const resultRoutes = require("./routes/resultRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();
const PORT = 3000;

// Використання middleware
app.use(cors());
app.use(express.json());
app.use(upload.any());

// Маршрути для всіх колекцій
app.use(products);
app.use(admins);
app.use(surveys);
app.use(questions);
app.use(answers);
app.use(categories);
app.use(priorities);
app.use(awsRoutes);
app.use(clients);
app.use(resultRoutes);
app.use(statsRoutes);

// Отримати поточний ID головного продукту
app.get("/api/showcase", (req, res) => {
  res.json({ showcaseProductId: getShowcaseProduct() });
});

// Встановити новий головний продукт
app.post("/api/showcase", verifyToken, (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  setShowcaseProduct(productId);
  res.json({ message: "Showcase product updated successfully", productId });
});

app.listen(PORT, () => {
  connect.connectToServer();
  console.log("Server is running");
});
