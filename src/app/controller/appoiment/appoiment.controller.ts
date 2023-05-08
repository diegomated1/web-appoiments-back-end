import {Appoiment, Appoiment_Model_Port, Appoiment_Controller_Port} from './appoiment.controller.dependency'

export default class Appoiment_Controller implements Appoiment_Controller_Port {
  constructor (private readonly model: Appoiment_Model_Port) { }
  
  getAll = (): Appoiment[] => {
    return this.model.getAll()
  }

  getById = (id_appoiment: string): Appoiment | null => {
    return this.model.getById(id_appoiment);
  };
}
