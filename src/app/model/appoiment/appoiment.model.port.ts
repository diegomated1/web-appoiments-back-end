import Appoiment from "../../../domain/appoiment.domain"

export default interface Appoiment_Model_Port {
  getAll: () => Appoiment[]
  getById: (id_appoiment:string) => Appoiment|null
}