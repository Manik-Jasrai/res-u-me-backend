const fetchJobs = require('./fetchJobs');

const jobData = async (jobRequirements) => {
    let allJobs = [];
    for (let i = 0;i< jobRequirements.length -1 ;i++) {
        const req = jobRequirements[i];
        const jobs = await fetchJobs(req);

        //calculate cosine similarity for each job

        allJobs = allJobs.concat(jobs);
    }
    return allJobs;
}

module.exports = jobData;