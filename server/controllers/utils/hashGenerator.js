const crypto = require('crypto');

module.exports = (data, salt) => {
    return crypto.createHash('sha256').update(data + salt).digest('hex');
};