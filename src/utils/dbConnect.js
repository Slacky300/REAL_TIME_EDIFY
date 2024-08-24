import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbConnect = async () => {

    const db = process.env.MONGODB_URI;
    await mongoose.connect(db)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.log('Could not connect to MongoDB...', err));
}

export default dbConnect;
