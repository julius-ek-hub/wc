import { lighten } from "@mui/material/styles";

const styles = {
	main: {
		"& .MuiDialogTitle-root, & .MuiDialogActions-root": {
			bgcolor: "secondaryHeaderBg",
			color: "secondaryHeaderText",
			padding: 1,
			"&.MuiDialogActions-root": {
				justifyContent: "flex-start",
				p: 2,
				position: "relative",
			},
		},
		"& .MuiDialog-paper": {
			width: "450px",
		},
		"& .MuiDialogContent-root": {
			display: "flex",
			flexDirection: "column",
			p: 0,
		},
	},
	title: {
		ml: 2,
		flexGrow: 1,
		color: "inherit",
		fontSize: "large",
		fontWeight: "bold",
	},
	done: {
		main: {
			bgcolor: (theme) => lighten(theme.palette.secondaryHeaderBg, 0.3),
			height: 60,
			width: 60,
			position: "absolute",
			bottom: 20,
			right: 30,
			"&:hover": {
				bgcolor: (theme) => lighten(theme.palette.secondaryHeaderBg, 0.1),
			},
			"&:disabled": {
				bgcolor: (theme) => lighten(theme.palette.secondaryHeaderBg, 0.1),
				opacity: 0.6,
			},
		},
		icon: {
			fontSize: "2rem",
			color: "secondaryHeaderText",
		},
	},
};

export default styles;
