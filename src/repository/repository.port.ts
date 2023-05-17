export default interface RepositoryPort<T> {
    getById: (id: string) =>  Promise<T|null>
    getAll: () => Promise<T[]>
    save: (entity: T, ttl?:number) => Promise<T|null>
    update: (id:string, entity: T) => Promise<T|null>
    delete: (id: string) => Promise<boolean>
}