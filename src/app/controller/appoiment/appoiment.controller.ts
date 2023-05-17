import {Appoiment_Model_Port, Appoiment_Controller_Port, Request, Response, ui, Appoiment, nsc} from './appoiment.controller.dependency'

export default class Appoiment_Controller implements Appoiment_Controller_Port {
  constructor (private readonly model: Appoiment_Model_Port) { }
  
  create = async (req: Request, res: Response) => {
    try{
      // Obtain appoiment from body
      const {
        client_id, client_name, client_second_name, client_address, client_birthday,
        description, place, date, type, premium
      } = req.body;

      // Create appoiment
      const appoiment = await this.model.create({
       id_appoiment: ui(),
       client_id, client_name, client_second_name, client_address, client_birthday,
       description, place, date, type, premium, status: 0
      });

      // Check if appoiment is created
      if(appoiment==null){
        res.status(400).json({message: 'Invalid data'});
      }else{
        // if created changed status to 1 if status is 0 when passed the appoiment date (expired appoiment)
        const date = new Date(appoiment.date.getTime());
        nsc.scheduleJob(date, async ()=>{
          const _appoiment = await this.model.getById(appoiment.id_appoiment);
          if(_appoiment && _appoiment.status==0){
            await this.model.update(appoiment.id_appoiment, {status: 1} as Appoiment);
          }
        });
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
      const _appoiment = await this.model.update(id_appoiment, {...appoiment});
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
