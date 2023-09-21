const mongoose = require('mongoose');
const path = require('path');
const fs = require('node:fs');
const m2s = require('mongoose-to-swagger');
const directoryPath = path.resolve(__dirname, 'models');

const models = [];

// Read the files in the directory
fs.readdirSync(directoryPath).forEach(file => {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isFile() && path.extname(file) === '.js') {
        const modelName = path.basename(file, '.js');
        const model = require(filePath);
        models.push({
            label: modelName,
            file: model
        });
    }
});



function generateSchemas() {
    return new Promise((resolve, reject) => {
        let modelIndex = 0;
        let modelLength = models.length;
        models.forEach( model => {
            try{
                 fs.writeFile('./swagger-schemas/' + model.label + '.json', JSON.stringify(m2s(model.file)), 'utf-8', (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(model.label + ' Done!!');
                    }
                    modelIndex++;
                    if(modelIndex >= modelLength){
                        resolve();
                    }
                });
            }catch(e){
                modelLength--;
            }
        });
    })
}

module.exports = {
    models,
    generateSchemas
};


















