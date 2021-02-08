import { hasDuplications } from '../../../../utilities';

export default (item) => {
    const { type, content, answers } = item;

    const values = answers.map(x => x.value);
    const correctnesses = answers.map(x => x.isCorrect);

    const isPuzzle = type === 'puzzle';

    if (!type) {
        return Promise.reject('יש לבחור חידה / בדיחה')
    }
    if (!content) {
        return Promise.reject('יש להזין תוכן');
    }

    if (isPuzzle) {
        if (!correctnesses.includes(true)) {
            return Promise.reject('יש לבחור תשובה אחת נכונה'); // bug --> chooses all if empty
        }
        if (hasDuplications(values)) { // answers &&? // check!
            return Promise.reject('אין להזין תשובות זהות');
        }
    }

    return Promise.resolve();
};