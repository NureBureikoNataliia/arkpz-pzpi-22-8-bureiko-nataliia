const express = require("express");
const database = require("../connect");
const ObjectId = require("mongodb").ObjectId;
const verifyToken = require("../authMiddleware");

let surveyRoutes = express.Router();

// Get all surveys
surveyRoutes.route("/surveys").get(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("surveys").find({}).toArray();

        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).send("No surveys found");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

// Get a survey by ID
surveyRoutes.route("/surveys/:id").get(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("surveys").findOne({ _id: new ObjectId(request.params.id) });

        if (data) {
            response.json(data);
        } else {
            response.status(404).send("Survey not found");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

// Create a new survey
surveyRoutes.route("/surveys").post(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let surveyObject = {
            name: request.body.name,
            description: request.body.description,
            questions_amount: request.body.questions_amount,
            actuality: request.body.type,
            change_date: request.body.change_date,
            admin: new ObjectId(request.body.admin), 
            questions: request.body.questions.map(id => new ObjectId(id)) 
        };

        let data = await db.collection("surveys").insertOne(surveyObject);
        response.status(201).json(data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

// Update an existing survey
surveyRoutes.route("/surveys/:id").put(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let surveyObject = {
            $set: {
                name: request.body.name,
                description: request.body.description,
                questions_amount: request.body.questions_amount,
                actuality: request.body.type,
                change_date: request.body.change_date,
                admin: new ObjectId(request.body.admin), 
                questions: request.body.questions.map(id => new ObjectId(id)) 
            }
        };

        let data = await db.collection("surveys").updateOne(
            { _id: new ObjectId(request.params.id) },
            surveyObject
        );

        if (data.matchedCount > 0) {
            response.json(data);
        } else {
            response.status(404).send("Survey not found for update");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

// Delete a survey
surveyRoutes.route("/surveys/:id").delete(verifyToken, async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("surveys").deleteOne({ _id: new ObjectId(request.params.id) });

        if (data.deletedCount > 0) {
            response.json(data);
        } else {
            response.status(404).send("Survey not found for deletion");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

module.exports = surveyRoutes;
