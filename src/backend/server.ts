import { indexRouter } from "./router";
import { CONFIG } from "./config/env";
import express from "express";
import helmet from 'helmet'
import http from 'http'

export class Server {

    private static instance: Server
    public readonly serverHttp: http.Server
    private listen: boolean = false

    private constructor() {
        this.serverHttp = new http.Server(this.getExpress())
    }

    public static getInstance() {
        return this.instance || (this.instance = new this())
    }
    private getExpress() {
        const appAplication = express();
        appAplication.use(express.json())
        appAplication.use(express.urlencoded())
        appAplication.use(helmet())
        appAplication.use(indexRouter)
        return appAplication
    }

    public async start(): Promise<void> {
        if (this.listen) { return }
        this.serverHttp.listen(CONFIG.PORT, () => {
            console.log(`Server listening on port ${CONFIG.PORT}`);
        });
    }
}