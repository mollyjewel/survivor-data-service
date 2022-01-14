const mongoose = require('mongoose');
const dbConfig = require("../../app/config/db.config.js");
const {dbconnect, dbclose} = require("../../app/helpers/dbConnect.js");

let basicSetup = () => {
    /*before((done)=>{
      dbconnect()
              .once('open', ()=>done())
              .on('error',(error) => done(error))
    })*/

    beforeEach((done)=>{
        mongoose.connection.db.listCollections({name: "contestants"})
            .next((error,collection)=>{
                if(collection){
                    mongoose.connection.db.dropCollection("contestants")
                    .then(() => done())
                    .catch((err) => done(err))
                }
                else{
                    done(error)
                }
            })


    })

    /*after((done)=>{                       // runs after the last test case
        dbclose()
                .then(()=>done())
                .catch((err)=>done(err))
    })*/
}

module.exports = basicSetup;
