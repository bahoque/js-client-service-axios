import axios, { AxiosInstance, AxiosResponse } from "axios";
import { from, Observable } from "rxjs";
import { Service as CoreService, TService } from "@bahoque/client-service-core";

function getData<T>(p: Promise<AxiosResponse<T>>): Promise<T> {
	return p.then(it => it.data)
}

function getId(method: keyof TService<any>, p: any): any {
	return ["find", "create"].includes(method) ? null : p[0];
}

function getParams(p: any): string {
	const query = p[p.length - 1]?.query;
	if (query && Object.keys(query).length) return `?${new URLSearchParams(query).toString()}`;
	return "";
}

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

	raw<T>(method: keyof TService<any>, ...p: any): Observable<T> {
		const id = getId(method, p);
		const params = getParams(p);
		const path = `/${this.path}${!!id ? `/${id}` : ""}${params}`;
		const config = { headers: p[p.length - 1]?.headers };
		switch (method) {
			case "get":
			case "find":
				return from(getData(this._client.get<T>(path, config)));
			case "create":
				return from(getData(this._client.post<T>(path, p[0], config)));
			case "update":
				return from(getData(this._client.put<T>(path, p[1], config)));
			case "patch":
				return from(getData(this._client.patch<T>(path, p[1], config)));
			case "remove":
				return from(getData(this._client.delete<T>(path, config)));
		}
	}
}
