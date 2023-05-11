import Ticket from 'domain/ticket.domain'
import Ticket_Controller_Port from './ticket.controller.port'
import Ticket_Model_Port from '../../../app/model/ticket/ticket.model.port'
import { Request, Response } from 'express'
import ui from 'uniqid';
import Appoiment_Model_Port from '../../model/appoiment/appoiment.model.port';

export { Ticket, Ticket_Model_Port, Ticket_Controller_Port, Request, Response, ui, Appoiment_Model_Port }