import { Router, WebAppRouterPort, Appoiment_Controller_Port, Ticket_Controller_Port } from './router.dependency'

export default class WebAppRouter implements WebAppRouterPort {
  router: Router

  constructor (
    private readonly appoimnetController: Appoiment_Controller_Port,
    private readonly ticketController: Ticket_Controller_Port,
  ) {
    this.router = Router()
    this.routes()
  }

  routes = (): void => {
    this.router.route('/client/:client_id/appoiments').get(this.appoimnetController.getAllByClient.bind(this.appoimnetController));

    this.router.route('/appoiments').get(this.appoimnetController.getAll.bind(this.appoimnetController));
    this.router.route('/appoiments').post(this.appoimnetController.create.bind(this.appoimnetController));
    this.router.route('/appoiments/:id_appoiment').get(this.appoimnetController.getById.bind(this.appoimnetController));
    this.router.route('/appoiments/:id_appoiment').put(this.appoimnetController.update.bind(this.appoimnetController));
    this.router.route('/appoiments/:id_appoiment').delete(this.appoimnetController.delete.bind(this.appoimnetController));
    
    this.router.route('/tickets').get(this.ticketController.getAll.bind(this.ticketController));
    this.router.route('/tickets').post(this.ticketController.create.bind(this.ticketController));
    this.router.route('/tickets/:id_ticket').get(this.ticketController.getById.bind(this.ticketController));
    this.router.route('/tickets/:id_ticket').delete(this.ticketController.delete.bind(this.ticketController));
  }
}
