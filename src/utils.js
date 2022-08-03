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

export const sf = (value, _sf) => {
	let count = _sf - String(value).length;
	count = count > 0 ? count : 0;
	return "0".repeat(count) + value;
};

export const date = (d) => {
	const now = new Date();
	const then = new Date(d || now);
	const yearNow = now.getFullYear();
	const yearThen = then.getFullYear();
	const monthNow = now.getMonth();
	const monthThen = then.getMonth();
	const dayNow = now.getDate();
	const dayThen = then.getDate();

	const defaultDate = then.toDateString();
	const forMessageThen = then.toLocaleTimeString();
	const forMessageNow = now.toLocaleTimeString();

	const dSplit = defaultDate.split(" ");
	let sticky = defaultDate;
	let today = false;

	let messageN =
		forMessageNow.split(":").slice(0, 2).join(":") +
		" " +
		(forMessageNow.split(" ")[1] || "");
	let messageT =
		forMessageThen.split(":").slice(0, 2).join(":") +
		" " +
		(forMessageNow.split(" ")[1] || "");
	if (yearNow === yearThen) {
		sticky = dSplit[1] + " " + dSplit[2];
		if (monthNow === monthThen && dayNow - dayThen === 1) sticky = "Yesterday";
	}
	if (now.toLocaleDateString() === then.toLocaleDateString()) {
		sticky = "Today";
		today = true;
	}

	return {
		message: messageT,
		sticky,
		chat: messageN === messageT ? "now" : today ? messageT : messageT,
	};
};

export const recordTime = (totalSeconds) => {
	const wholeMins = Math.floor(totalSeconds / 60);
	const wholeSec = Math.floor(totalSeconds % 60);

	return `${sf(wholeMins, 2)}:${sf(wholeSec, 2)}`;
};

export const blobURL = (blob) =>
	(window.URL || window.webkitURL).createObjectURL(blob);
