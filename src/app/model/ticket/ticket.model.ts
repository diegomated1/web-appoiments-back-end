import {Ticket, Ticket_Model_Port, Ticket_Repository_Adapter_Port} from './ticket.model.dependency';

export default class Ticket_Model implements Ticket_Model_Port{

    constructor(
        private readonly repository: Ticket_Repository_Adapter_Port<Ticket>
    ){}

    getAll = () => this.repository.getAll();
    getById = (id_appoiment:string) => this.repository.getById(id_appoiment);
}