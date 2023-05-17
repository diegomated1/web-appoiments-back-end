import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import {Ticket_Controller_Port, Ticket_Model_Port, Request, Response, Appoiment_Model_Port, ui} from './ticket.controller.dependency'

export default class Ticket_Controller implements Ticket_Controller_Port {
  constructor (
    private readonly model: Ticket_Model_Port,
    private readonly appoimentModel: Appoiment_Model_Port
  ) { }
  
  create = async (req: Request, res: Response) => {
    try{
      const {id_appoiment} = req.body;
      const appoiment = await this.appoimentModel.getById(id_appoiment);

      if(appoiment==null){
        return res.status(404).json({message: 'Appoiment not found'});
      }
      if(appoiment.status!=0){
        return res.status(400).json({message: 'Appoiment expired/invalid'});
      }
      const currentDate = new Date();
      const client_age = (currentDate.getTime() - appoiment.client_birthday.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      const exp = Math.ceil((appoiment.date.getTime()-currentDate.getTime())/1000) + 60;
      if(exp<=0){
        return res.status(400).json({message: 'Appoiment expired'});
      }
      let priority = (appoiment.premium) ? 
                        (client_age>=60) ? 0 : 2 
                        : (client_age>=60) ? 1 : 3;

      const ticket = await this.model.create({
        id_ticket: ui(),
        date: new Date(),
        id_appoiment,
        priority
      }, exp);

      if(ticket==null){
        return res.status(400).json({message: 'Invalid data'});
      }else{
        return res.status(200).json({data: ticket});
      }
    }catch(error){
      console.log(error);
      res.status(500).json({message: 'Internal error server'});
    }
  }

  getAll = async (req: Request, res: Response) => {
    try{
      const tickets = await this.model.getAll();
      res.status(200).json({data: tickets});
    }catch(error){
      res.status(500).json({message: 'Internal error server'});
    }
  }

  getById = (req: Request, res: Response) => {
    try{
      const {id_ticket} = req.params;
      const ticket = this.model.getById(id_ticket);
      res.status(200).json({data: ticket});
    }catch(error){
      res.status(500).json({message: 'Internal error server'});
    }
  };

  delete = async (req: Request, res: Response) => {
    try{
      const {id_ticket} = req.params;
      const result = await this.model.delete(id_ticket);
      res.status(200).json({result});
    }catch(error){
      res.status(500).json({message: 'Internal error server'});
    }
  };

}
