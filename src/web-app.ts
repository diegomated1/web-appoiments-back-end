import { RouterWebAppPort, Application, express, path, morgan, cors } from './web-app.dependency'
export default class WebApp {
  #app: Application

  constructor (private readonly routerWebApp: RouterWebAppPort) {
    this.#app = express()
    this.#config()
    this.#routes()
  }

  #config = (): void => {
    this.#app.use(cors({
      origin: process.env.CLIENT_HOST! || true,
    }));
    this.#app.use(express.static(path.join(__dirname, '../public')))
    this.#app.use(express.json());
    this.#app.use(morgan('dev'));
  }

  #routes = (): void => {
    this.#app.use('/', this.routerWebApp.router)
    this.#app.use('*', this.routerWebApp.router)
  }

  start = (): void => {
    this.#app.listen(process.env.API_PORT, () => {
      const port = (process.env.API_PORT != null) ? process.env.API_PORT : 'undefined'
      const host = (process.env.API_HOST !== undefined) ? process.env.API_HOST : 'undefined'
      console.info(`SERVER: http://${host}:${port}`)
    })
  }
}
