import express from 'express';
import * as controller from './riddle.controller';

const router = express.Router();

router.get('/', async (req, res) => {
    const data = await controller.getAll();
   return res.json(data);
});

router.post('/', async ({ body }, res) => {
    const riddle = await controller.create(body);
    return res.json(riddle);
});

router.patch('/:id/like', async ({ params }, res) => {
    const { id } = params;
    const riddle = await controller.like(id);
    return res.json(riddle);
});

router.get('/:id/verify', async ({ params, query }, res) => {
    const { id } = params;
    const { answer } = query;
    const verified = await controller.verify(id, answer);
    return res.send(verified);
});

export default router;