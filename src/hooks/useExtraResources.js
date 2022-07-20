import { useSelector, useDispatch } from "react-redux";
import { selectExtras, setEmojis } from "../features/reduces/extras";

import * as services from "../api/services";

const useExtraResources = () => {
	const { emojis } = useSelector(selectExtras);
	const dispatch = useDispatch();

	const fetchEmojis = async () => {
		const { groups, emojis: em } = await services.fetEmojis();
		dispatch(
			setEmojis({
				...emojis,
				groups,
				emojis: em,
				fetching: false,
			}),
		);
	};

	return {
		emojis,
		fetchEmojis,
		allReady: !emojis.fetching,
	};
};

export default useExtraResources;
