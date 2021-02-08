import 'dotenv-extended/config';

import connectToDb from './config/mongoose';
import startServer from './config/express';

const start =  async () => {
    try {
        await connectToDb();
        console.log('Connected To DB.');
        await startServer();
    }
    catch (e) {
        console.log(e);
    }
};

start();