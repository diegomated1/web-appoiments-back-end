import {Ticket, Ticket_Controller_Port, Ticket_Model_Port} from './ticket.controller.dependency'

export default class Appoiment_Controller implements Ticket_Controller_Port {
  constructor (private readonly model: Ticket_Model_Port) { }
  
  getAll = (): Ticket[] => {
    return this.model.getAll()
  }

  getById = (id_appoiment: string): Ticket | null => {
    return this.model.getById(id_appoiment);
  };
}
