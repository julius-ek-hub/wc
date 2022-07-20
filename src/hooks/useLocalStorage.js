import { tryElseReturn } from "../utils";

function useLocalStorage() {
	const get = (key) =>
		tryElseReturn(() => JSON.parse(localStorage.getItem(key)), null)();

	const set = (key, value) => {
		tryElseReturn(
			() => localStorage.setItem(key, JSON.stringify(value)),
			null,
		)();
	};

	return { get, set };
}

export default useLocalStorage;
