import Ticket from '../../../domain/ticket.domain';

export default interface Ticket_Model_Port {
  getAll: () => Ticket[]
  getById: (id_ticket:string) => Ticket|null
}