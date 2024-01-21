const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8081;
const DATABASE_URL = "mongodb://localhost:27017/newDB";

const spotSchema = new mongoose.Schema({
    name: String,
    type: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    busyIndex: {
        type: Number,
        min: 0,
        max: 5
    },
    busyIndexSum: Number,
    count: Number
});
spotSchema.index({ location: '2dsphere' });

// Create the Spot model
const SpotModel = mongoose.model("Spot", spotSchema, "Spots");

// Connect to the database
mongoose.connect(DATABASE_URL);

mongoose.connection.once("open", () => {
    console.log("Connected to the database!");
}).on("error", (error) => {
    console.log("Connection Error:", error);
});

// Middleware to parse JSON requests
app.use(express.json());

// API Endpoints for Spot Operations

//finds all spots in a specific location (1 mile radius)
//req- long and lat
app.get('/api/spots', async (req, res) => {
    try {
        // Assuming req.query.longitude and req.query.latitude are provided
        const longitude = parseFloat(req.query.longitude);
        const latitude = parseFloat(req.query.latitude);
        
        const typeFilter = req.query.type; // Assuming 'type' is provided in the query parameters
        const typeCondition = typeFilter ? { type: typeFilter } : {};

        const spots = await SpotModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 1609.34 // 1 mile in meters
                }
            },
             ...typeCondition // Include the type filter condition
        });
        console.log(spots)
        res.json(spots);
    } catch (error) {
        console.error("Error fetching spots:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//gets a specific spot info from Mongo
//req- spotID
app.get('/api/spots/:spotId', async (req, res) => {
    try {
        const spot = await SpotModel.findById(req.params.spotId);
        if (!spot) {
            res.status(404).json({ error: "Spot not found" });
        } else {
            console.log('Spot details:', spot);
            res.json(spot);
        }
    } catch (error) {
        console.error("Error fetching spot details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//creates a spot in Mongo db
//req = schema info
app.post('/api/spots', async (req, res) => {
    try {
        const newSpot = new SpotModel(req.body);
        const savedSpot = await newSpot.save();

        res.status(201).json(savedSpot);
    } catch (error) {
        console.error("Error creating spot:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/spots/update-busy-index/:spotId', async (req, res) => {
    try {
        const { spotId } = req.params;
        const { newBusyIndex } = req.body;

        // Update busy index for the specified spot by spot ID
        await SpotModel.findByIdAndUpdate(spotId, { $inc: { 'busyIndexSum': newBusyIndex, 'count': 1 } });
        const { busyIndexSum, count } = await SpotModel.findById(spotId, 'busyIndexSum count');
        const updatedBusyIndex = count > 0 ? busyIndexSum / count : 0;
        await SpotModel.findByIdAndUpdate(spotId, { $set: { busyIndex: updatedBusyIndex } });
        res.status(200).json({ message: 'Busy index updated successfully' });
    } catch (error) {
        console.error("Error updating busy index:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

async function resetBusyIndexForAllSpots() {
    try {
        // Resetting busy index to a default value (e.g., 0) for all spots
        await SpotModel.updateMany({}, { $set: { busyIndex: 0, busyIndexSum: 0, count: 0 } });
        console.log('Busy index reset for all spots');
    } catch (error) {
        console.error('Error resetting busy index for all spots:', error);
    }
}

// Run the function every hour (3600000 milliseconds)
setInterval(resetBusyIndexForAllSpots, 3600000);


// Start the server
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server is running on port ${PORT}`);
});