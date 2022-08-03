import useConnection from "./useConnection";

function useFiles() {
	const conn = useConnection();

	const upload = async ({ file, folder }) => {
		const { data: secureURL } = await conn.emit("s3-url", {
			ext: file.type.split("/")[1],
			folder,
		});
		await fetch(secureURL, {
			body: file,
			method: "PUT",
			headers: { "Content-Type": "multipart/form-data" },
		});
	};

	/**
	 * @returns {Promise<[File]>}
	 */
	const chooseFileFromStorage = ({ muliple = false, accept = "*" } = {}) => {
		return new Promise((res) => {
			const input = document.createElement("input");
			input.hidden = true;
			input.setAttribute("type", "file");
			input.multiple = muliple;
			input.accept = accept;
			input.onchange = (e) => {
				res([].slice.call(e.target.files));
			};
			input.onclick = input.remove;
			document.body.appendChild(input);
			input.click();
		});
	};

	return {
		upload,
		chooseFileFromStorage,
	};
}

export default useFiles;
