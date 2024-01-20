const express = require('express');
const multer = require('multer');
const PDFParser = require('pdf-parse');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const cleanData = require('./cleanData');
const classifyEntity = require('./classifyEntity');
const getJobRequirements = require('./getJobRequirements');

app.use(cors());

app.post('/upload', upload.single('pdfFile'), async (req, res) => {
    const pdfBuffer = req.file.buffer;
    try {
        //data extracted from pdf
        const data = await PDFParser(pdfBuffer);
        const pdfText = data.text;

        // cleaned data
        const keywords = cleanData(pdfText);

        //classified data
        const classifiedData = await classifyEntity(keywords);
        
        const jobProfiles = [];
        //fetch from api

        const jobRequirements = getJobRequirements(jobProfiles);

        //fetch all the jobs

        
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
