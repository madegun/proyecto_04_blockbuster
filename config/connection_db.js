import mongoose from 'mongoose';

// This function connects to the database.
const connectDatabase = async (url, port, name) => {
    try {
        await mongoose.connect(`mongodb://${url}:${port}/${name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('mongodb connected');
    } catch (e) {
        console.log(e);
    }
}

export default connectDatabase;