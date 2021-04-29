const debug = require("debug")("app:mongo")
const { config } = require("../config/index")
const { MongoClient, ObjectId } = require("mongodb")

/* Encoding complex info to avoid unexpected behaviors */
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        this.dbName = DB_NAME
    }

    /* Keep open the connection */
    async connect() {
        // Create connection if doesn't exist
        if (!MongoLib.connection) {
            try {
                await this.client.connect()
                debug('Succesful connection to Mongo')
                MongoLib.connection = this.client.db(this.dbName)
            } catch (err) {
                console.log(err)
            } 
        }
        // Return the connection if exist
        return MongoLib.connection
    }

    /* Open new connection each time is need */
    // connect() {
    //     return new Promise((resolve, reject) => {
    //         this.client.connect(error => {
    //             if (error) {
    //                 reject (error)
    //             }

    //             console.log("Connected succesfully to Mongo")
    //             resolve(this.client.db(this.dbName))
    //         })
    //     })
    // }

    getAll(collection, query) {
        return this.connect()
            .then( db => {
                return db
                    .collection(collection)
                    .find(query)
                    .toArray()
            })
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
        });
    }
    
    create(collection, data) {
        return this.connect()
            .then(db => {
                return db.collection(collection).insertOne(data);
            })
            .then(result => result.insertedId);
    }
    
    update(collection, id, data) {
        return this.connect()
            .then(db => {
                return db
                .collection(collection)
                .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
            })
            .then(result => result.upsertedId || id);
    }
    
    delete(collection, id) {
        return this.connect()
            .then(db => {
                return db.collection(collection).deleteOne({ _id: ObjectId(id) });
            })
            .then(() => id);
    }
}

module.exports = MongoLib

