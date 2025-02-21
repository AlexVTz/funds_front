import { IncomingMessage } from 'http';
import { parse as parseQuery } from 'querystring';

export const parseBody = (req: IncomingMessage) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(parseQuery(body));
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
};