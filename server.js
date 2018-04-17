const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

const PORT = process.env.NODE_ENV === "production" ? 3005 : 3001;
 
app.use(cors());

// Here can be authorisation if it need
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

app.get('/api/:jsonFileName', (req, res) => {
    const jsonFileName = `${req.params.jsonFileName}.json`;

    fs.readFile(jsonFileName, 'utf8', (err, data) => {
        if (err) {
            res.status(400).send('JSON file do not found');
        } else {
            res.status(200).json(JSON.parse(data));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server run on ${PORT} port`);
});