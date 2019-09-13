const MongoClient = require('mongodb').MongoClient;

// Connect to the db
const dbMongo = async () => {
    return new Promise((resolve, reject )=> {
        MongoClient.connect("mongodb://localhost:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }, function (err, client) {
            if(err) reject(err);
    
             resolve(client);
                    
        });
    })
}

const getData = async (limit=10) => {
    const database = await dbMongo().then(result => result);
    return new Promise((resolve, reject) => {
        database.db('local').collection('examen',(err, collection) => {
            collection.find().limit(limit).toArray((err, items) => {
                if(err) reject(err);   
                
                resolve(items);            
            });
        })
    })
}

const filterData = async (minutes)=> {
    const database = await dbMongo().then(result => result);
    return new Promise((resolve, reject) => {
        database.db('local').collection('examen',(err, collection) => {
            let date = new Date();
            date.setMinutes( date.getMinutes() - minutes)
            collection.find({ "created_at" : { $gte: date } }).toArray((err, item) => {
                if(err) reject(err);   
                resolve(item); 
            })
        })
    })
}

const insertData = async(objectData) => {
    const database = await dbMongo().then(result => result);
    return new Promise((resolve, reject) => {
        database.db('local').collection('examen',(err, collection) => {
            if(err) reject(err);
            collection.insertOne({...objectData, created_at : new Date(objectData.created_at)}, (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        });
    })
}

module.exports = {
    getData,
    insertData,
    filterData
}