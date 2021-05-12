import mongoose from 'mongoose';

// This function connects the app to the database.
const connectDatabase = async (url, port, name) => {
    try {
        const connection = await mongoose.connect(`mongodb://${url}:${port}/${name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('mongodb connected');
        // return connection;
    } catch (e) {
        console.log(e);
    }
}

export default connectDatabase;