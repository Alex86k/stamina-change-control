import express from "express"
import cors from "cors"
import http from "http"
import dotenv from "dotenv"

const app: express.Application = express()
const server: http.Server = http.createServer(app);

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import {routers} from "./routes"

dotenv.config()

app.use(cors({
    origin: true,
    credentials: true,
}))


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use("/api/stamina", routers.staminaRouter)

const PORT = process.env.PORT ?? 3000

server.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`))
