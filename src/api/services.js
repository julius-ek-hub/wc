import { tryElseReturn } from "../utils";

const _fetch = async (url) => {
	const data = await fetch(url);
	return data.json();
};

export const fetEmojis = tryElseReturn(
	async () => {
		const groups = [];
		const data = await _fetch(
			"https://emoji-api.com/emojis?access_key=4213c5b5fc57e42a9289fa40233005f234f39ae6",
		);

		data.forEach((res) => {
			if (!groups.map(({ group }) => group).includes(res.group))
				groups.push(res);
		});

		return {
			emojis: data,
			groups,
		};
	},
	{ emojis: [], groups: [] },
);
