import * as express from 'express';
require('express-async-errors');
import * as methodOverride from "method-override";
import * as cors from 'cors';
import {Application} from "express";
import {GiftRouter} from "./routers/gift";
import {ChildRouter} from "./routers/child";
import { MyRouter } from './types/router';
import { handleError } from './utils/errors';
require('./utils/db');



export class App {
    private app: Application;
    private readonly routers = [GiftRouter,ChildRouter];
    constructor() {
        this.configureApp();
        this.setRoutes();
        this.run();
        this.setErrors();
    }
    private configureApp(): void{
        this.app = express();
        this.app.use(methodOverride('_method'));
        this.app.use(express.json()); // Content-type: application/json
        this.app.use(cors({
            origin:'http://localhost:3000',
        }))
    }
    private setRoutes(): void {
        for (const router of this.routers) {
            const obj: MyRouter = new router();
            this.app.use(obj.urlPrefix, obj.router)
        }
    }
    private setErrors(): void{
        this.app.use(handleError);
    }
    private run(): void {
        this.app.listen(3001, '0.0.0.0', () => {
            console.log('Listening on http://localhost:3001');
        });
    }
}

new App();








