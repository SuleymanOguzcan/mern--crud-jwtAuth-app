const mongoose = require("mongoose");
const mongoURI ="mongodb+srv://suleymanoguzcan1:12345@dukkan.nehkblt.mongodb.net/";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Database başarılı baglandı");
  });
};

module.exports = connectToMongo;

