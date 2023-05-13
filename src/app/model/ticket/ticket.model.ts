import {Ticket, Ticket_Model_Port, Ticket_Repository_Adapter_Port} from './ticket.model.dependency';

export default class Ticket_Model implements Ticket_Model_Port{

    constructor(
        private readonly repository: Ticket_Repository_Adapter_Port<Ticket>
    ){}

    create = (entity: Ticket, ttl?:number):Promise<Ticket|null> => {
        return new Promise(async(res, rej)=>{
            try{
                const ticket = await this.repository.save(entity, ttl);
                res(ticket);
            }catch(error){
                rej(error);
            }
        });
    };
    getAll = ():Promise<Ticket[]> => {
        return new Promise((res, rej)=>{
            try{
                res(this.repository.getAll());
            }catch(error){
                rej(error);
            }
        });
    };
    getById = (id_appoiment:string) => this.repository.getById(id_appoiment);
}