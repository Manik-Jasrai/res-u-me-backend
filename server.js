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
const predictJobProfile = require('./predictJobProfile');
const jobData = require('./jobData');

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
        
        //get all the job profiles based on resume 
        const jobProfiles = await predictJobProfile(classifiedData);
        
        //get all the requirements
        const jobRequirements = await getJobRequirements(jobProfiles);
        console.log(jobRequirements);
        //fetch all the jobs
        
        const allJobs = await jobData(jobRequirements);
        console.log(allJobs);

        res.status(200).json(allJobs);
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
