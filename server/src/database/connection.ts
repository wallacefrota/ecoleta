import knex from 'knex';
import path from 'path';
// connection with database
const connection = knex({
    client: 'sqlite3',
    // archive save bd
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});
// export connection
export default connection;