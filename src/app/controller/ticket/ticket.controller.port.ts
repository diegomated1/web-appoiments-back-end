import Ticket from "../../../domain/ticket.domain"

export default interface Ticket_Controller_Port {
  getAll: () => Ticket[]
  getById: (id_ticket: string) => Ticket|null
}
