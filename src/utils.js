export const sleep = (duration = 1000) => {
	return new Promise((res) => setTimeout(res, duration));
};

export const uniqueArray = (all, key) => {
	const result = [];
	const populate = (items) => {
		items &&
			items.forEach((item) => {
				if (!result.some((r) => r[key] === item[key])) result.push(item);
			});
	};

	all.map(populate);

	return result;
};

export const capitalizeFirstLetter = (str) =>
	str[0].toUpperCase() + str.split("").slice(1).join("");

export const tryElseReturn = (fn, fallback) => () => {
	try {
		return fn();
	} catch (error) {
		return fallback;
	}
};

export const insertEmoji = (value, textField) => {
	let _value = textField.value;

	const start = textField.selectionStart;
	const end = textField.selectionEnd;
	const length = end - start;

	const __value = _value.split("");
	__value.splice(start, length, value);

	const finalValue = __value.join("");

	textField.value = finalValue;
};

export const getEnv = (key) => process.env[key + "_" + process.env.NODE_ENV];
