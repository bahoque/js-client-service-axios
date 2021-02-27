import axios, { AxiosInstance } from "axios";
import { from, Observable } from "rxjs";
import { Service as CoreService, TService } from "@bahoque/client-service-core";

export class Service<T1 = any> extends CoreService<T1> {
	private _timeout: number;
	private _url: string;
	private _path: string;

	private _client: AxiosInstance;

	constructor(path: string) {
		super();

		this._path = path;

		this.makeClient();
	}

	get client(): AxiosInstance {
		return this._client;
	}

	set client(value: AxiosInstance) {
		this._client = value;
	}

	get path(): string {
		return this._path;
	}

	set path(value: string) {
		this._path = value;
		this.makeClient();
	}

	get timeout(): number {
		return this._timeout;
	}

	set timeout(value: number) {
		this._timeout = value;
		this.makeClient();
	}

	get url(): string {
		return this._url;
	}

	set url(value: string) {
		this._url = value;
		this.makeClient();
	}

	private makeClient(): void {
		this._client = axios.create({
			baseURL: this._url + this._path,
			timeout: this._timeout,
		});
	}

	raw<T>(method: keyof TService<T>, ...rest: any): Observable<T> {
		return null;
	}
}
