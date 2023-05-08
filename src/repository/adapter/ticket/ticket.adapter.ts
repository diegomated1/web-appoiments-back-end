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

    getById = (id: string) => null;
    getAll = () => [];
    save = (entity: Ticket) => null;
    update = (entity: Ticket) => null;
    delete = (id: string) => true;
}