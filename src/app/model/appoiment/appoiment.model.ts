import {Appoiment, Appoiment_Model_Port, Appoiment_Repository_Adapter_Port} from './appoiment.model.dependency';

export default class Appoiment_Model implements Appoiment_Model_Port{

    constructor(
        private readonly repository: Appoiment_Repository_Adapter_Port<Appoiment>
    ){}

    getAll = () => this.repository.getAll();
    getById = (id_appoiment:string) => this.repository.getById(id_appoiment);
}