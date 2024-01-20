const { spawn } = require('child_process');
const path = require('path');

const predictJobProfile = async (classifiedData) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [path.join(__dirname,'python-script','main.py'), classifiedData]);
    
    let profiles = '';
    let profileObject;
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);  
        profiles += data.toString(); 
      });
      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
        reject(data); 
      });
    pythonProcess.on('close', (code) => {
      console.log(`Python script process exited with code ${code}`);
      profileObject = {'profile':profiles};
      resolve(profileObject);
    });

  });
    
};

const runPrediction = async (classifiedData) => {
  try {
    const result = await predictJobProfile(classifiedData);
    console.log('Success:', result);
    return JSON.parse(result.profile.replace(/'/g,"\""));
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = runPrediction;