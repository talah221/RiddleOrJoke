import Joke from './joke.model';

export const getAll = () => Joke.find({ confirmed: true });

export const create = (joke) => Joke(joke).save();

export const like = (id) => 
    Joke.findOneAndUpdate(
            { _id: id }, 
            { $inc: { likes: 1} },
            { new: true }
        );