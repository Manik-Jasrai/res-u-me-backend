const fetchJobs = require('./fetchJobs');

const jobData = async (jobRequirements) => {
    let allJobs = [];
    for (let i = 0;i< jobRequirements.length -1 ;i++) {
        const req = jobRequirements[i];
        const job = await fetchJobs(req);

        //calculate cosine similarity for each job

        allJobs = allJobs.concat(job);
    }
    return allJobs;
}

module.exports = jobData;