import {
    Appoiment,
    Appoiment_Repository_Adapter_Port,
    Appoiment_Repository_Entity,
    Appoiments_Database 
} from './appoiment.adapter.dependency';

export default class Appoiment_Repository_Adapter implements Appoiment_Repository_Adapter_Port<Appoiment>{

    constructor(
        private readonly database: Appoiments_Database
    ){}

    getById = (id: string) => null;
    getAll = () => [];
    save = (entity: Appoiment) => null;
    update = (entity: Appoiment) => null;
    delete = (id: string) => true;
}