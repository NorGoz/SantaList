import {HttpMethods} from "./http-methods";

export interface RestDecoratorInfo {
    httpMethod: HttpMethods;
    path: string;
    propertyName: string;
}
