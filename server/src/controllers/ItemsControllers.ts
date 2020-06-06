import {Request, Response} from 'express';
// importing connection with database
import knex from '../database/connection';

// creating class items controller
class ItemsController {
    async index (request: Request, response: Response) {
        // buscando dados da tabela items
        const items = await knex('items').select('*');
        // delivering data in new format (undestable)
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.1.104:3333/uploads/${item.image}`
            }
        })
        // return call
        return response.json(serializedItems);
    }
};

// exporting class
export default ItemsController;