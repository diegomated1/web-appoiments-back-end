import Appoiment_Controller from "./app/controller/appoiment/appoiment.controller";
import Ticket_Controller from "./app/controller/ticket/ticket.controller";
import Appoiment_Model from "./app/model/appoiment/appoiment.model";
import Appoiment_Model_Port from "./app/model/appoiment/appoiment.model.port";
import Ticket_Model from "./app/model/ticket/ticket.model";
import Ticket_Model_Port from "./app/model/ticket/ticket.model.port";
import Appoiments_Database from "./database/appoiments.database";
import Appoiment from "./domain/appoiment.domain";
import Ticket from "./domain/ticket.domain";
import Appoiment_Repository_Adapter from "./repository/adapter/appoiment/appoiment.adapter";
import Appoiment_Repository_Adapter_Port from "./repository/adapter/appoiment/appoiment.adapter.port";
import Ticket_Repository_Adapter from "./repository/adapter/ticket/ticket.adapter";
import Ticket_Repository_Adapter_Port from "./repository/adapter/ticket/ticket.adapter.port";
import WebAppRouter from "./router/router";
import { Appoiment_Controller_Port, Ticket_Controller_Port } from "./router/router.dependency";
import WebApp from "./web-app.js";
import dotenv from 'dotenv'
import path from "path";

dotenv.config({
    path: path.join(__dirname, '../config/.env.development')
})

const database = new Appoiments_Database();
database.connect();

const ticketRepository: Ticket_Repository_Adapter_Port<Ticket> = new Ticket_Repository_Adapter(database);
const appoimentRepository: Appoiment_Repository_Adapter_Port<Appoiment> = new Appoiment_Repository_Adapter(database);

const ticketModel: Ticket_Model_Port = new Ticket_Model(ticketRepository);
const appoimentModel: Appoiment_Model_Port = new Appoiment_Model(appoimentRepository);

const ticketController: Ticket_Controller_Port = new Ticket_Controller(ticketModel, appoimentModel);
const appoimentController: Appoiment_Controller_Port = new Appoiment_Controller(appoimentModel);

const router = new WebAppRouter(appoimentController, ticketController);
const webapp = new WebApp(router);

webapp.start();