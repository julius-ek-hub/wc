import { useState } from "react";

function useDropDownMenu() {
	const [open, setOpen] = useState(null);

	const handleClick = (e) => {
		setOpen({ x: e.clientX, y: e.clientY });
	};
	const handleClose = () => {
		setOpen(null);
	};

	return { open, handleClick, handleClose };
}

export default useDropDownMenu;
