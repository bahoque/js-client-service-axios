import axios, { AxiosInstance } from "axios";
import { from, Observable } from "rxjs";
import { Service as CService, TService } from "@bahoque/client-service-core";

export class Service<T1 = any> extends CService<T1> {
    protected readonly _service: TService<T1>;
    protected readonly _serviceName: string;

    protected static _client: AxiosInstance | undefined;
    protected static _url: string;

    constructor(serviceName: string) {
        super();
        this._serviceName = serviceName.trim();
        this._service = Service._client!.service(this._serviceName);
    }

    /*
     * Getter and Setter
     */

    static get client(): any | undefined {
        return this._client;
    }

    static set client(value: any | undefined) {
        this._client = value;
    }

    get serviceName(): string {
        return this._serviceName;
    }

    get timeout(): number {
        return this._service.timeout;
    }

    set timeout(value: number) {
        this._service.timeout = value;
    }

    /*
     * static methods
     */

    init(url: string) {
        Service._url = url;
        Service._client = axios.create({})
    }

    /*
     * class methods
     */

    raw<T>(method: keyof FService<T>, ...rest: any): Observable<T> {
        const request: Promise<T> = this._service[method](...rest);
        return from(request);
    }
}
