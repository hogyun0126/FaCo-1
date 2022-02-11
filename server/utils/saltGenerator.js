const crypto = require('crypto');

module.exports = () => {
    return crypto.randomBytes(128).toString('base64');
};