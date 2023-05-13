import {
    Appoiment,
    Appoiment_Repository_Adapter_Port,
    Appoiment_Repository_Entity,
    Appoiments_Database 
} from './appoiment.adapter.dependency';

export default class Appoiment_Repository_Adapter implements Appoiment_Repository_Adapter_Port<Appoiment>{

    constructor(
        private readonly database: Appoiments_Database
    ){}

    getById = (id: string): Promise<Appoiment> => {
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

    save = (entity:Appoiment): Promise<Appoiment> => {
        return new Promise(async(res, rej)=>{
            try{
                const params: string[] = [];
                const columns: string[] = [];
                Object.entries(entity).forEach((attr)=>{
                    columns.push(attr[0]);
                    params.push(attr[1]);
                });
                const query = `INSERT INTO appoiments_by_id (${columns.join(', ')}) VALUES (${columns.map(_=>'?').join(', ')})`;
                await this.database.client.execute(query, [...params], {prepare: true});
                res(await this.getById(entity.id_appoiment));
            }catch(error){
                rej(error);
            }
        });
    };

    update = (id_appoiment:string, entity: Appoiment): Promise<Appoiment|null> => {
        return new Promise(async(res, rej)=>{
            try{
                const params: string[] = [];
                const columns: string[] = [];
                Object.entries(entity).forEach((attr)=>{
                    columns.push(attr[0]);
                    params.push(attr[1]);
                });
                const query = `UPDATE appoiments_by_id SET ${columns.map(c=>(` ${c} = ?`)).join(', ')} WHERE id_appoiment = ?`;
                await this.database.client.execute(query, [...params, id_appoiment], {prepare: true});
                res(await this.getById(id_appoiment));
            }catch(error){
                rej(error);
            }
        });
    };
    
    delete = (id: string) => true;
}