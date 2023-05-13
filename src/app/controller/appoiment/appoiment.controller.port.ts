import Appoiment from "../../../domain/appoiment.domain"
import { Request, Response } from "express"

export default interface Appoiment_Controller_Port {
  create: (req: Request, res: Response) => void
  getAll: (req: Request, res: Response) => void
  getById: (req: Request, res: Response) => void
  update: (req: Request, res: Response) => void
}
