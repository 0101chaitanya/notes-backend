const info = (...params) => process.env.NODE_ENV !== 'test' ? console.info(...params) : false;
const error = (...params) => process.env.NODE_ENV !== 'test' ? console.error(...params) : false;

module.exports = {
    info,
    error
}