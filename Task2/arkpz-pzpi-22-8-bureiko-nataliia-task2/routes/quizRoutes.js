const express = require("express");
const database = require("../connect");
const ObjectId = require("mongodb").ObjectId;
const verifyToken = require("../authMiddleware");

let quizRoutes = express.Router();

// Get all quizzes
quizRoutes.route("/quizzes").get(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("quizzes").find({}).toArray();

        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).send("No quizzes found");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

// Get a quiz by ID
quizRoutes.route("/quizzes/:id").get(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("quizzes").findOne({ _id: new ObjectId(request.params.id) });

        if (data) {
            response.json(data);
        } else {
            response.status(404).send("Quiz not found");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

// Create a new quiz
quizRoutes.route("/quizzes").post(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let quizObject = {
            name: request.body.name,
            description: request.body.description,
            questions_amount: request.body.questions_amount,
            actuality: request.body.type,
            change_date: request.body.change_date,
            admin: ObjectId(request.body.admin), 
            questions: request.body.questions.map(id => ObjectId(id)) 
        };

        let data = await db.collection("quizzes").insertOne(quizObject);
        response.status(201).json(data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

// Update an existing quiz
quizRoutes.route("/quizzes/:id").put(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let quizObject = {
            $set: {
                name: request.body.name,
                description: request.body.description,
                questions_amount: request.body.questions_amount,
                actuality: request.body.type,
                change_date: request.body.change_date,
                admin: ObjectId(request.body.admin), 
                questions: request.body.questions.map(id => ObjectId(id)) 
            }
        };

        let data = await db.collection("quizzes").updateOne(
            { _id: new ObjectId(request.params.id) },
            quizObject
        );

        if (data.matchedCount > 0) {
            response.json(data);
        } else {
            response.status(404).send("Quiz not found for update");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

// Delete a quiz
quizRoutes.route("/quizzes/:id").delete(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("quizzes").deleteOne({ _id: new ObjectId(request.params.id) });

        if (data.deletedCount > 0) {
            response.json(data);
        } else {
            response.status(404).send("Quiz not found for deletion");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

module.exports = quizRoutes;
