const linkedIn = require('linkedin-jobs-api');
const fetchJobs = async (jobProfile) => {
    const response = await linkedIn.query(jobProfile)
    console.log(response); 
}

const jobProfile = {
    keyword: 'software engineer',
    location: 'India',
    dateSincePosted: 'past Week',
    jobType: 'full time',
    remoteFilter: 'remote',
    experienceLevel: 'entry level',
    limit: '10'
};


module.exports = fetchJobs;
