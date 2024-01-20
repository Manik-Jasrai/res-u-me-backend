
const classifyEntity = async (keywords) => {

    //classifying each word with categories
    const response = await fetch("https://api-inference.huggingface.co/models/suyashmittal/lnm-ner",
    {
        method : 'POST',
        headers : {"Authorization" : "Bearer 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"},
        body : JSON.stringify({"inputs" : keywords}),
        contentType : 'application/json'
    });
    const data = await response.json();

    
    const categories = {
        "Designation": "",
        "Skills": "",
        "Degree": "",
        "Companies worked at": ""
    };

    const mergedData = [];

    //solving the problem of word breaking
    for(let i =0;i<data.length -1;i++) {
        const currentObj = data[i];
        const nextObj = data[i+1];

        if (currentObj.end === nextObj.start) {
            const newWord = currentObj.word.concat(nextObj.word);
            const mergedObj = {...currentObj,word : newWord};
            mergedData.push(mergedObj);
            i++;
        } else {
            mergedData.push(currentObj);
        }
    }
    if (data.length > 0) {
        mergedData.push(data[data.length - 1]);
    }

    //sorting the data into categories
    mergedData.forEach(obj => {
        const category = obj.entity_group;
        if (categories.hasOwnProperty(category)) {
            const words = obj.word.replace(/#/g,'');
            categories[category] = categories[category].concat(words," ");
            
        }
    });

    //combining all categories into a string
    let classifiedData = "";
    Object.values(categories).forEach(category => {
        classifiedData = classifiedData.concat(category," ");
    })

    console.log(classifiedData);
    return classifiedData;
}

module.exports = classifyEntity;