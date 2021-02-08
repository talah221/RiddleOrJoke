import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import riddleRoutes from '../api/riddle';
import jokeRoutes from '../api/joke';

const PORT = 3000;

export default async () => {
    const app = express();

    app.use(cors());
    app.use(json());

    app.use('/riddles', riddleRoutes);
    app.use('/jokes', jokeRoutes);

    app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
};