const stopwords = require('stopword');

const cleanData = (resumeText) => {
    resumeText = resumeText.replace(/http\S+\s*/g, ' ');  // remove URLs
    resumeText = resumeText.replace(/#\S+/g, '');  // remove hashtags
    resumeText = resumeText.replace(/@\S+/g, '  ');  // remove mentions
    resumeText = resumeText.replace(/[!"$%#&'()*,-./:;<=>?@[\]^_`{|}~]/g, ' ');  // remove punctuations
    resumeText = resumeText.replace(/[^\x00-\x7f]/g, ' ');  // remove non-ASCII characters
    resumeText = resumeText.replace(/\s+/g, ' ');  // remove extra whitespace

    const inputString = resumeText.toLowerCase();
    const words = inputString.split(/\s+/);
    const filteredWords = stopwords.removeStopwords(words);
    const resultString = filteredWords.join(' ');
    return resultString
};

module.exports = cleanData;