// config modules
import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';

// controller points class
import PointsController from './controllers/PointsControllers';
// controller items class
import ItemsController from './controllers/ItemsControllers';

const routes = express.Router();
const upload = multer(multerConfig);

// new instance class pointscontroller
const pointsController = new PointsController();
// new instance class items
const itemsController = new ItemsController();

// routes application
// routes items
routes.get('/items', itemsController.index);

// routes points
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
// route post point collect
routes.post(
    '/points', 
    upload.single('image'),
    // validation fields
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
);

// export routes
export default routes;