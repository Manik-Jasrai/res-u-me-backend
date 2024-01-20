const getJobRequirements = (jobProfiles) => {
    jobProfiles.forEach(profile => {

        if (profile.Probability > 0) {
            const requirement = {
                keyword: `${profile.Category}`,
                location: 'India',
                dateSincePosted: 'past Month',
                jobType: 'full time',
                remoteFilter: 'remote',
                experienceLevel: 'entry level',
                limit: '4'
            };
            jobRequirements.push(requirement);
        };
    });

    return jobRequirements;
};