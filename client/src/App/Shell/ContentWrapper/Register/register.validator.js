export default (user) => {
    if (!user.username) {
        return Promise.reject('יש למלא שם משתמש');
    }
    if (!user.password) {
        return Promise.reject('יש למלא סיסמה');
    }
    if (!user.mail) {
        return Promise.reject('יש למלא מייל');
    }
    return Promise.resolve();
};