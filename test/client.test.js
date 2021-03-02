const axios = require("axios");
const service = require("../src/service");

const base = "https://jsonplaceholder.typicode.com";
const timeout = 3000;

describe("create service", () => {
	const user = new service.Service(base, "users", timeout);

	it("request get", function (done) {
		user.get(1).subscribe((data) => {
			done();
		});
	});

	it("request find", function (done) {
		user.find({ }).subscribe((data) => {
			done();
		});
	});

	it("request create", async function (done) {
		done();
	});

	it("request update", async function (done) {
		done();
	});

	it("request patch", async function (done) {
		done();
	});
});
