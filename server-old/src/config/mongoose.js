import mongoose from 'mongoose';

const { DB_CONNECTION_STRING } = process.env;

// export default async () =>
//     mongoose.connect(DB_CONNECTION_STRING, {
//         useNewUrlParser: true, 
//         useUnifiedTopology: true
//     });
const mongoAtlasUri = 'mongodb+srv://tal:<password>@cluster0.hy1hx.mongodb.net/<dbname>?retryWrites=true&w=majority'

export default () => {

    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            mongoAtlasUri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log(" Mongoose is connected")
        );

    } catch (e) {
        console.log("could not connect");
    }

}
