const mongoose = require("mongoose")

const connectDatabase = () =>{
    mongoose
      .connect(process.env.DB_URI)
      .then((e) => {
        console.log(`Mongodb connected with server ${e.connection.host}`);
      });
}

module.exports = connectDatabase;