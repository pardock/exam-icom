const database = require('./data_base_service');

const processData = async (objectData) => {
    if(!objectData)
        return { code: 404, message : 'Error al obtener los datos del API', data : {} }

    let insert = await database.insertData(objectData).then(result => result).catch(error => console.log(error));
    let data = await database.getData().then(result => result).catch(error => console.log(error));
    return { code: 200, message : 'Ok', data };
}

const filterData = async(minutes) => {
    let datos = await database.filterData(minutes).then(result => result).catch(error => { console.log(error); return []})
    return { code: 200, message : 'Ok', data: datos };
}

module.exports = {
    processData,
    filterData
};