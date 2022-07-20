import { useEffect, useState } from "react";

import useSettings from "./useSettings";
import useExtraResources from "./useExtraResources";

function useAppInitialiser() {
	const [preparingComponents, setPreparingComponents] = useState(true);
	const { settings, initializeExistingUser } = useSettings();
	const { fetchEmojis, allReady } = useExtraResources();

	useEffect(() => {
		if (!allReady) fetchEmojis();
		initializeExistingUser().then(() => {
			setPreparingComponents(false);
		});
	}, [preparingComponents]);

	return {
		loading: preparingComponents || !allReady,
		settings,
	};
}

export default useAppInitialiser;
