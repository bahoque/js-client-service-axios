import axios, { AxiosInstance } from "axios";
import { from, observable, Observable } from "rxjs";
import { Service as CoreService, TService } from "@bahoque/client-service-core";

export class Service<T1 = any> extends CoreService<T1> {
	private _client: AxiosInstance;

	constructor(baseURL: string, url: string, timeout: number = 3000) {
		super();
		this.makeClient(baseURL, url, timeout);
	}

	get client(): AxiosInstance {
		return this._client;
	}

	set client(value: AxiosInstance) {
		this._client = value;
	}

	get path(): string {
		return this._client.defaults.url;
	}

	set path(value: string) {
		this._client.defaults.url = value;
	}

	get timeout(): number {
		return this._client.defaults.timeout;
	}

	set timeout(value: number) {
		this._client.defaults.timeout = value;
	}

	get urlBase(): string {
		return this._client.defaults.baseURL;
	}

	set urlBase(value: string) {
		this._client.defaults.baseURL = value;
	}

	private makeClient(baseURL: string, url: string, timeout: number): void {
		this._client = axios.create({ baseURL, timeout, url });
	}

	raw<T>(method: keyof TService<T>, ...rest: any): Observable<T> {
		console.log(method);
		switch (method) {
			case "get":
				return new Observable<T>((subscriber) => {
					console.log(1);
					this._client
						.get<T>(`/users/${rest[0]}`)
						.then((data) => {
							console.log(2);
							subscriber.next(data.data);
							subscriber.complete();
						})
						.catch((error) => {
							console.log(3);
							subscriber.error(error);
						});
				});
			default:
				return new Observable<T>((subscriber) => {
					subscriber.next();
					subscriber.complete();
				});
		}
	}
}
