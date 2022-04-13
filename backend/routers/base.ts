import * as express from "express";
import {App} from "../index";
import { RestDecoratorInfo } from "../types/router";

export class BaseRouter{
    public readonly router = express.Router();

    constructor( protected wapp: App) {
        this.wapp = wapp;
        this.setUpRoutes();
    }

    setUpRoutes() {
        const ar: RestDecoratorInfo[] = Reflect.get(this,'_restApiCalls') ?? [];

        for (const apiOp of ar) {
            this.router[apiOp.httpMethod](apiOp.path, (...args) => (this as any)[apiOp.propertyName](...args))
        }
    }
}
