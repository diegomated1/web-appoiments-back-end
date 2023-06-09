import Ticket from '../../../domain/ticket.domain';

export default interface Ticket_Model_Port {
  create: (entity:Ticket, ttl?:number) => Promise<Ticket|null>
  getAll: () => Promise<Ticket[]>
  getById: (id_ticket:string) => Promise<Ticket|null>
  delete: (id_ticket:string) => Promise<boolean>
}