import { Request, Response } from "express"
export default interface Ticket_Controller_Port {
  create: (req: Request, res: Response) => void
  getAll: (req: Request, res: Response) => void
  getById: (req: Request, res: Response) => void
  delete: (req: Request, res: Response) => void
}
