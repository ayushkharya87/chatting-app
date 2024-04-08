import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((error) => {
        console.log("error in DB", error);
    })
};

export default connectDB;