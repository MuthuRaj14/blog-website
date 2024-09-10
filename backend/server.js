const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const postRoutes = require('./routes/posts.js');
const categoryRoutes = require('./routes/Categories.js'); // Ensure the file name casing is correct

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('DB error', err));

app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes); // Corrected route path

app.listen(PORT, () => console.log('Server running on port ' + PORT));
