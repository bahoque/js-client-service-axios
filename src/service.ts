import axios, { AxiosInstance } from "axios";
import { from, Observable } from "rxjs";
import { Service as CoreService, TService } from "@bahoque/client-service-core";

export class Service<T1 = any> extends CoreService<T1> {
    constructor() {
        super();
    }

    raw<T>(method: keyof TService<T>, ...rest: any): Observable<T> {
        return null
    }
}
