import Appoiment from "../../../domain/appoiment.domain"

export default interface Appoiment_Model_Port {
  create: (entity:Appoiment) => Promise<Appoiment|null>
  getAll: () => Promise<Appoiment[]>
  getById: (id_appoiment:string) => Promise<Appoiment|null>
}