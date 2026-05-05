import mongoose from 'mongoose';

function connectToDb() {
    const mongoUri = process.env.MONGO_URI?.trim();

    if (!mongoUri) {
        throw new Error('MONGO_URI is not set in the backend .env file');
    }

    mongoose.connect(mongoUri, {
        authSource: 'admin',
        serverSelectionTimeoutMS: 10000,
    }).then(() => {
        console.log('Connected to Db');
    }).catch(err => {
        console.error('MongoDB connection failed:', err.message);
        throw err;
    });
}

export default connectToDb;
