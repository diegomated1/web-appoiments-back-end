export default interface RepositoryPort<T> {
    getById: (id: string) =>  Promise<T|null>
    getAll: () => Promise<T[]>
    save: (entity: T) => Promise<T|null>
    update: (entity: T) => T | null
    delete: (id: string) => boolean
}