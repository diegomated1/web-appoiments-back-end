import {
    Appoiment,
    Appoiment_Repository_Adapter_Port,
    Appoiments_Database 
} from './appoiment.adapter.dependency';

export default class Appoiment_Repository_Adapter implements Appoiment_Repository_Adapter_Port<Appoiment>{

    constructor(
        private readonly database: Appoiments_Database
    ){}

    getById = (id: string): Promise<Appoiment|null> => {
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT * FROM appoiments_by_id WHERE id_appoiment = ?`;
                const query_result = await this.database.client.execute(query, [id], {prepare: true});
                const row = query_result.first();
                res(row as unknown as Appoiment);
            }catch(error){
                rej(error);
            }
        });
    };

    getAllByStatus = (status:number): Promise<Appoiment[]> => {
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT * FROM appoiments_by_status WHERE status = ?`;
                const query_result = await this.database.client.execute(query, [status], {prepare: true});
                const rows = query_result.rows;
                res(rows as unknown as Appoiment[]);
            }catch(error){
                rej(error);
            }
        });
    };

    getAllByClient = (client_id: string): Promise<Appoiment[]> => {
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT * FROM appoiments_by_client WHERE client_id = ?`;
                const query_result = await this.database.client.execute(query, [client_id], {prepare: true});
                const rows = query_result.rows;
                res(rows as unknown as Appoiment[]);
            }catch(error){
                rej(error);
            }
        });
    };

    getAll = (): Promise<Appoiment[]> => {
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT * FROM appoiments_by_id`;
                const query_result = await this.database.client.execute(query, [], {prepare: true});
                const rows = query_result.rows;
                res(rows as unknown as Appoiment[]);
            }catch(error){
                rej(error);
            }
        });
    };

    save = (entity:Appoiment): Promise<Appoiment|null> => {
        return new Promise(async(res, rej)=>{
            try{
                const params: string[] = [];
                const columns: string[] = [];
                Object.entries(entity).forEach((attr)=>{
                    columns.push(attr[0]);
                    params.push(attr[1]);
                });
                let query1 = `INSERT INTO appoiments_by_id (${columns.join(', ')}) VALUES (${columns.map(_=>'?').join(', ')})`;
                let query2 = `INSERT INTO appoiments_by_client (${columns.join(', ')}) VALUES (${columns.map(_=>'?').join(', ')})`;
                let query3 = `INSERT INTO appoiments_by_status (${columns.join(', ')}) VALUES (${columns.map(_=>'?').join(', ')})`;
                const queries =  [
                    { query: query1, params: [...params] },
                    { query: query2, params: [...params] }, 
                    { query: query3, params: [...params] } 
                ];
                await this.database.client.batch(queries, {prepare: true});
                res(await this.getById(entity.id_appoiment));
            }catch(error){
                rej(error);
            }
        });
    };

    update = (id_appoiment:string, entity: Appoiment): Promise<Appoiment|null> => {
        return new Promise(async(res, rej)=>{
            try{
                const _appoiment = await this.getById(id_appoiment);
                if(!_appoiment){
                    return res(null);
                }
                const oldStatus = _appoiment.status;
                const {status} = entity;
                _appoiment.status = status;
                const params: string[] = [];
                const columns: string[] = [];
                Object.entries(_appoiment).forEach((attr)=>{
                    columns.push(attr[0]);
                    params.push(attr[1]);
                });
                let query1 = `UPDATE appoiments_by_id SET status = ? WHERE id_appoiment = ? AND date = ?`;
                let query2 = `UPDATE appoiments_by_client SET status = ? WHERE client_id = ? AND id_appoiment = ? AND date = ?`;
                let query3 = `DELETE FROM appoiments_by_status WHERE status = ? AND date = ? AND id_appoiment = ?`;
                let query4 = `INSERT INTO appoiments_by_status (${columns.join(', ')}) VALUES (${columns.map(_=>'?').join(', ')})`;
    
                const queries =  [
                    { query: query1, params: [status, id_appoiment, _appoiment.date] },
                    { query: query2, params: [status, _appoiment.client_id, id_appoiment, _appoiment.date] },
                    { query: query3, params: [oldStatus, _appoiment.date, id_appoiment] },
                    { query: query4, params: [...params] } 
                ]; 
                await this.database.client.batch(queries, {prepare: true});
                res(await this.getById(id_appoiment));
            }catch(error){
                rej(error);
            }
        });
    };
    
    delete = (id: string): Promise<boolean> => {
        return new Promise(async(res, rej)=>{
            try{
                const _appoiment = await this.getById(id);
                if(!_appoiment){
                    return res(false);
                }
                let query1 = `DELETE FROM appoiments_by_id WHERE id_appoiment = ?`;
                let query2 = `DELETE FROM appoiments_by_client WHERE client_id = ? AND id_appoiment = ?`;
                let query3 = `DELETE FROM appoiments_by_status WHERE status = ? AND date = ? AND id_appoiment = ?`;
                const queries =  [
                    { query: query1, params: [id] },
                    { query: query2, params: [_appoiment.client_id, id] },
                    { query: query3, params: [_appoiment.status, _appoiment.date, id] } 
                ];
                await this.database.client.batch(queries, {prepare: true});
                res(true);
            }catch(error){
                rej(error);
            }
        });
    };
}