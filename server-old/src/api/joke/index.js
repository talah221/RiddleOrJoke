import express from 'express';
import * as controller from './joke.controller';

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Trying to get all');
    const data = await controller.getAll();
    
    res.json(data);
});

router.post('/', async (req, res) => {
    const { body : newJoke } = req;

    const joke = await controller.create(newJoke);

    res.json(joke);
});

router.patch('/:id/like', async ({ params }, res) => {
    const { id } = params;

    const joke = await controller.like(id);

    res.json(joke);
});


export default router;