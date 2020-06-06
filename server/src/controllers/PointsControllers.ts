// importing modules
import {Request, Response} from 'express';
import knex from '../database/connection';

class PointsController {
    // show point especific
    async show(request: Request, response: Response) {
        // id of point
        const {id} = request.params;
        // search per id
        const point = await knex('point').where('id', id).first();
        // return error
        if(!point) {
            return response.status(404).json({message: 'Point not found.'})
        }

        const serializedPoint = {
                ...point,
                image_url: `http://192.168.1.104:3333/uploads/${point.image}`
        };

        // relationship items with points
        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

        // return success
        return response.json({point: serializedPoint, items});
    }
    // post create points
    async create(request: Request, response: Response) {
        // destruct getting data body
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        // transaction if one insert fail not execute next
        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
        // insert in table points data
        const insertedIds = await trx('point').insert(point);
        // get id point
        const point_id = insertedIds[0]
        // get each item defined and save
        const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
            return {
                item_id,
                point_id          
            }
        })
        // relationship poins with items insert
        await trx('point_items').insert(pointItems);
        // success insert after
        await trx.commit();
        // return
        return response.json({
            id: point_id,
            ...point, 
        })
    }
    // list point per filter (city, uf, items)
    async index(request: Request, response: Response) {
        // get values in query for search
        const {city, uf, items} = request.query;
        // transform items in array passing for number
        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));
        // get points at least one is
        const points = await knex('point')
        .join('point_items', 'point.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('point.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.1.104:3333/uploads/${point.image}`
            }
        })
        // return call
        return response.json(serializedPoints);
        
    }
}

// export class
export default PointsController;