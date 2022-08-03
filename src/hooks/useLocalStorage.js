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
	const remove = (key) => localStorage.removeItem(key);

	return { get, set, remove };
}

export default useLocalStorage;
