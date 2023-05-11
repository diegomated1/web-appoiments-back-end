import {
    Ticket,
    Ticket_Repository_Adapter_Port,
    Ticket_Repository_Entity,
    Appoiments_Database 
} from './ticket.adapter.dependency';

export default class Ticket_Repository_Adapter implements Ticket_Repository_Adapter_Port<Ticket>{

    constructor(
        private readonly database: Appoiments_Database
    ){}

    getById = (id: string): Promise<Ticket> => {
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT * FROM tickets_by_id WHERE id_ticket = ?`;
                const query_result = await this.database.client.execute(query, [id], {prepare: true});
                const row = query_result.first();
                res(row as unknown as Ticket);
            }catch(error){
                rej(error);
            }
        });
    };

    getAll = (): Promise<Ticket[]> => {
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT * FROM tickets_by_priority`;
                const query_result = await this.database.client.execute(query, [], {prepare: true});
                const rows = query_result.rows;
                res(rows as unknown as Ticket[]);
            }catch(error){
                rej(error);
            }
        });
    };

    save = (entity:Ticket): Promise<Ticket> => {
        return new Promise(async(res, rej)=>{
            try{
                const params: string[] = [];
                const columns: string[] = [];
                Object.entries(entity).forEach((attr)=>{
                    columns.push(attr[0]);
                    params.push(attr[1]);
                });
                const query1 = `INSERT INTO tickets_by_id (${columns.join(', ')}) VALUES (${columns.map(_=>'?').join(', ')})`;
                const query2 = `INSERT INTO tickets_by_priority (${columns.join(', ')}) VALUES (${columns.map(_=>'?').join(', ')})`;

                const queries =  [
                    { query: query1, params: [...params] },
                    { query: query2, params: [...params] } 
                 ];

                await this.database.client.batch(queries, {prepare: true});
                res(await this.getById(entity.id_ticket));
            }catch(error){
                rej(error);
            }
        });
    };

    update = (entity: Ticket) => null;
    delete = (id: string) => true;
}