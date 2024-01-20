const linkedIn = require('linkedin-jobs-api');
const fetchJobs = async (jobProfile) => {
    const response = await linkedIn.query(jobProfile);
    console.log(response); 
    return response;
}

module.exports = fetchJobs;
