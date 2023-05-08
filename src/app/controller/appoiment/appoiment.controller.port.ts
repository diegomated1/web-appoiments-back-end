import Appoiment from "../../../domain/appoiment.domain"

export default interface Appoiment_Controller_Port {
  getAll: () => Appoiment[]
  getById: (id_job: string) => Appoiment|null
}
