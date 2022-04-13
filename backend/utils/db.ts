

import {createPool} from "mysql2/promise";
interface Pool{
    host: string,
    user: string,
    database: string,
    namedPlaceholders: boolean,
    decimalNumbers: boolean,
}

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_santa_gifts',
    namedPlaceholders: true,
    decimalNumbers: true,
});


