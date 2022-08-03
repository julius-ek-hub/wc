import useLocalStorage from "./useLocalStorage";
import useSettings from "./useSettings";

function useMedia() {
	const { set, get } = useLocalStorage();
	const { updateSettings } = useSettings();

	const getUserMedia = (query) => {
		const media = navigator.mediaDevices || navigator;
		return media.getUserMedia(query);
	};

	const requestMediaPermission = async (constraint) => {
		updateSettings("permission_request", constraint);
		const stream = await getUserMedia(constraint);
		stream.getTracks().forEach((track) => track.stop());
	};

	const requestCameraPermission = async () => {
		let existingPermissions = get("permissions");
		if (existingPermissions?.camera) return;
		await requestMediaPermission({ video: true });
		set("permissions", { ...existingPermissions, camera: true });
	};
	const requestMicrophonePermission = async () => {
		let existingPermissions = get("permissions");
		if (existingPermissions?.mic) return;
		await requestMediaPermission({ audio: true });
		set("permissions", { ...existingPermissions, mic: true });
	};
	const requestCameraAndMicophonePermission = async () => {
		let existingPermissions = get("permissions");
		if (existingPermissions?.media) return;
		await requestMediaPermission({
			audio: true,
			video: true,
		});
		set("permissions", {
			...existingPermissions,
			media: true,
		});
	};

	const permisions = () => {};

	return {
		requestCameraAndMicophonePermission,
		requestCameraPermission,
		requestMicrophonePermission,
		requestMediaPermission,
	};
}

export default useMedia;
