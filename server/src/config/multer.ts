// importing modules
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
// config upload image
export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            // generate hash
            const hash = crypto.randomBytes(6).toString('hex');

            // new name archive using hash
            const fileName = `${hash}-${file.originalname}`;

            // callback erro/success
            callback(null, fileName);
        }
    })
}