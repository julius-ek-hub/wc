import io from "socket.io-client";

import useLocalStorage from "./useLocalStorage";

const BASE_URL = "http://localhost:4000";
global.endpoints = {};

const useConnection = () => {
	const { get } = useLocalStorage();
	const use = (endpoint) => {
		return new Promise((res, rej) => {
			let conn = global.endpoints[endpoint] || {};
			if (!conn.connection) {
				global.endpoints[endpoint] = {};
				const socket = io(BASE_URL + endpoint, {
					auth: { token: get("wc-jwt-user") },
				});
				socket.on("connect", () => {
					global.endpoints[endpoint].connection = socket;
					res(socket);
				});
				socket.on("connect_error", (message) => {
					console.log(message);
					rej(message);
				});
			} else {
				let socket = conn.connection;
				if (socket.disconnected) socket.connect();
				res(socket);
			}
		});
	};

	const emit = (event, data) => {
		return new Promise(async (res, rej) => {
			const conn = await use("/live");
			conn.emit(event, data, (response) => res({ data: response }));
		});
	};

	const on = async (event, callback) => {
		const conn = await use("/live");
		conn.on(event, callback);
	};

	return {
		emit,
		on,
		use,
	};
};

export default useConnection;
