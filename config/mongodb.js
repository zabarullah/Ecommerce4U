import mongoose from "mongoose";

const connectMongoDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`Connected to MongoDB host: ${mongoose.connection.host}`);
    })
    .catch((err) => {
      console.log('Error connecting to MongoDB:', err);
    });

};

export default connectMongoDB;
