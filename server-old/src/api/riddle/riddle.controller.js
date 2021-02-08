import Riddle from './riddle.model';

export const getAll = () => Riddle.find({ confirmed: true });

export const create = (riddle) => Riddle(riddle).save();

export const like = (id) => 
    Riddle.findOneAndUpdate(
            { _id: id }, 
            { $inc: { likes: 1} },
            { new: true }
        );

export const verify = async (id, answer) => {
    const { answers } = await Riddle.findOne({ _id: id});

    return !!answers.find(x => x.value === answer && x.isCorrect);
};