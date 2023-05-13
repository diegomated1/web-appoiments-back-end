import {Appoiment, Appoiment_Model_Port, Appoiment_Repository_Adapter_Port} from './appoiment.model.dependency';

export default class Appoiment_Model implements Appoiment_Model_Port{

    constructor(
        private readonly repository: Appoiment_Repository_Adapter_Port<Appoiment>
    ){}

    create = (entity: Appoiment):Promise<Appoiment|null> => {
        return new Promise(async(res, rej)=>{
            try{
                const ticket = await this.repository.save(entity);
                res(ticket);
            }catch(error){
                rej(error);
            }
        });
    };
    getAll = () :Promise<Appoiment[]> => {
        return new Promise(async(res, rej)=>{
            try{
                const appoiments = await this.repository.getAll();
                res(appoiments);
            }catch(error){
                rej(error);
            }
        })
    }
    getById = (id_appoiment:string): Promise<Appoiment|null> => {
        return new Promise(async(res, rej)=>{
            try{
                const appoiment = await this.repository.getById(id_appoiment);
                res(appoiment);
            }catch(error){
                rej(error);
            }
        })
    };

    update = (id_appoiment: string, entity: Appoiment): Promise<Appoiment | null> => {
        return new Promise(async(res, rej)=>{
            try{
                const appoiment = await this.repository.update(id_appoiment, entity);
                res(appoiment);
            }catch(error){
                rej(error);
            }
        });
    };

}