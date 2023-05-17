import RepositoryPort from "../../../repository/repository.port";

export default interface Appoiment_Repository_Adapter_Port<T> extends RepositoryPort<T> {
    getAllByClient: (client_id: string) =>  Promise<T[]>
}