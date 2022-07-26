import { createTheme, darken } from "@mui/material/styles";

const themeInMode = (mode = "light") =>
	createTheme({
		palette: {
			mode,
			primary: {
				main: "#008069",
			},
			unread: {
				main: "#25d366",
				light: "#25d366",
				dark: "#25d366",
				text: "#fff",
			},

			messageBg: {
				incoming: mode === "dark" ? "#202c33" : "#fff",
				outgoing: mode === "dark" ? "#005c4b" : "#d9fdd3",
			},
			check: "#53bdeb",
			blueBg: "#53bdeb",
			loadLine: { main: "#f0f2f5" },
			primaryHeaderBg: mode === "dark" ? "#202c33" : "#f0f2f5",
			secondaryHeaderBg: mode === "dark" ? "#202c33" : "#008069",
			securityBg: mode === "dark" ? "inherit" : "#ffeecd",
			secondaryHeaderText: "#fff",
			background: {
				paper: mode === "dark" ? darken("#202c33", 0.4) : "#fff",
			},
		},
		components: {
			MuiButtonBase: {
				defaultProps: {
					disableRipple: true,
					sx: {
						textTransform: "none",
					},
				},
			},
			MuiLink: {
				defaultProps: {
					underline: "none",
					href: "#",
					sx: {
						cursor: "pointer",
					},
				},
			},
		},
	});

export default themeInMode;
