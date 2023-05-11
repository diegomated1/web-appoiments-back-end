import Appoiment from "../../../domain/appoiment.domain"
import { Request, Response } from "express"

export default interface Appoiment_Controller_Port {
  create: (req: Request, res: Response) => Promise<void>
  getAll: (req: Request, res: Response) => void
  getById: (req: Request, res: Response) => void
}
