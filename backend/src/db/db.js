import mongoose from 'mongoose';

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to Db');
    }).catch(err => {
        console.log(err);
    });
}

export default connectToDb;
