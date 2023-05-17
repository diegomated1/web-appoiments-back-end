import {Appoiment_Model_Port, Appoiment_Controller_Port, Request, Response, ui, Appoiment} from './appoiment.controller.dependency'

export default class Appoiment_Controller implements Appoiment_Controller_Port {
  constructor (private readonly model: Appoiment_Model_Port) { }
  
  create = async (req: Request, res: Response) => {
    try{
      const {
        client_id, client_name, client_second_name, client_address, client_birthday,
        description, place, date, type, premium
      } = req.body;
      const appoiment = await this.model.create({
       id_appoiment: ui(),
       client_id, client_name, client_second_name, client_address, client_birthday,
       description, place, date, type, premium, status: 0
      });
      if(appoiment==null){
        res.status(400).json({message: 'Invalid data'});
      }else{
        res.status(200).json({data: appoiment});
      }
    }catch(error){
      console.log(error);
      res.status(500).json({message: 'Internal error server'});
    }
  }

  getAll = async (req: Request, res: Response) => {
    try{
      const {status} = req.query;
      const isNum = /^-?\d+$/;
      let appoiments: Appoiment[];
      if(status && typeof status == 'string' && isNum.test(status)){
        let _status = Number(status);
        _status = (_status < 0 || _status > 2) ? 0 : _status;
        appoiments = await this.model.getAllByStatus(_status);
      }else{
        appoiments = await this.model.getAll();
      }
      res.status(200).json({data: appoiments});
    }catch(error){
      res.status(500).json({message: 'Internal error server'});
    }
  }

  getAllByClient = async (req: Request, res: Response) => {
    try{
      const {client_id} = req.params;
      const appoiments = await this.model.getAllByClient(client_id);
      res.status(200).json({data: appoiments});
    }catch(error){
      res.status(500).json({message: 'Internal error server'});
    }
  }

  getById = async (req: Request, res: Response) => {
    try{
      const {id_appoiment} = req.params;
      const appoiment = await this.model.getById(id_appoiment);
      if(appoiment){
        res.status(200).json({data: appoiment});
      }else{
        res.status(404).json({message: 'Appoiment not found'});
      }
    }catch(error){
      res.status(500).json({message: 'Internal error server'});
    }
  };

  update = async (req: Request, res: Response) => {
    try{
      const {id_appoiment} = req.params;
      const {appoiment} = req.body;
      const _appoimentModel = await this.model.getById(id_appoiment);
      if(_appoimentModel==null){
        return res.status(404).json({message: "appoiment not found"});
      }
      const _appoiment = await this.model.update(id_appoiment, {...appoiment, date: _appoimentModel.date, client_id: _appoimentModel.client_id});
      res.status(200).json({data: _appoiment});
    }catch(error){
      console.log(error);
      res.status(500).json({message: 'Internal error server'});
    }
  };

  delete = async (req: Request, res: Response) => {
    try{
      const {id_appoiment} = req.params;
      const result = await this.model.delete(id_appoiment);
      res.status(200).json({result});
    }catch(error){
      res.status(500).json({message: 'Internal error server'});
    }
  };

}
