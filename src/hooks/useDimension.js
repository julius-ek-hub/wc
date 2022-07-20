import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

function useDimension() {
	const theme = useTheme();

	const useSize = (key) => useMediaQuery(theme.breakpoints.only(key));

	let xsm = useSize("xs");
	const sm = useSize("sm");
	const md = useSize("md");
	const lg = useSize("lg");
	const xlg = useSize("xlg");

	if (xsm)
		throw new Error(
			"Screen size too small, App is not that responsive. If you resized your screen, don't forget to refresh after resizing to a normal screen size",
		);

	return {
		md,
		sm,
		lg,
		xsm,
		xlg,
		mainLeftWidth: xsm || sm || md ? "300px" : "30%",
		mainRightWidth: xsm || sm ? "calc(100% - 300px)" : "30%",
	};
}

export default useDimension;
