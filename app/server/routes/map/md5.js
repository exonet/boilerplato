import crypto from 'crypto';

/**
 * Create an MD5 hashed string.
 *
 * @param {string} value The input stirng.
 *
 * @return {string} The MD5 hash of the input string.
 */
export default value => crypto.createHash('md5').update(value).digest('hex');
