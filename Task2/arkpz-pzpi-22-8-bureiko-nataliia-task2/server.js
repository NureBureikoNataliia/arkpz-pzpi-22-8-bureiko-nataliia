const connect = require("./connect")
const express = require("express")
const cors = require("cors")
const multer = require("multer")
const upload = multer()

// Підключення до всіх маршрутів
const products = require("./routes/productRoutes");
const admins = require("./routes/adminRoutes");
const quizzes = require("./routes/quizRoutes");
const questions = require("./routes/questionRoutes");
const answers = require("./routes/answerRoutes");
const categories = require("./routes/categoryRoutes");
const priorities = require("./routes/priorityRoutes");
const awsRoutes = require("./routes/awsRoutes")

const app = express();
const PORT = 3000;

// Використання middleware
app.use(cors());
app.use(express.json());
app.use(upload.any())

// Маршрути для всіх колекцій
app.use(products);
app.use(admins);
app.use(quizzes);
app.use(questions);
app.use(answers);
app.use(categories);
app.use(priorities);
app.use(awsRoutes)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log("Server is running")
})