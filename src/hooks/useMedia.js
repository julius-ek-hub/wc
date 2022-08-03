import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/reduces/permissions";
import useLocalStorage from "./useLocalStorage";

function useMedia() {
	const permissions = useSelector(({ permissions }) => permissions);

	const { set, get } = useLocalStorage();

	const dispatch = useDispatch();

	const updatePermission = (key, value) => {
		const _update = {
			...permissions,
			[key]: value,
		};
		dispatch(update(_update));

		set("permissions", _update);
	};

	const getUserMedia = (query) => {
		const media = navigator.mediaDevices || navigator;
		return media.getUserMedia(query);
	};

	const requestPermission = async (type) => {
		get();
		try {
			const stream = await getUserMedia({ [type]: true });
			stream.getTracks().forEach((track) => track.stop());
			return "granted";
		} catch (error) {
			return "rejected";
		}
	};

	const recordAudio = async () => {
		if (!permissions.microphone || permissions.microphone === "rejected") {
			const state = await requestPermission("audio");
			if (state === "rejected") throw new Error("Mic not found");
		}

		let recorder, chunks, stream;

		const blob = () => new Blob(chunks, { type: "audio/mp3" });

		const start = async (previousChunks) => {
			return new Promise(async (res, rej) => {
				stream = await getUserMedia({ audio: true });
				recorder = new MediaRecorder(stream);
				chunks = previousChunks || [];
				recorder.start();
				recorder.ondataavailable = (ev) => {
					chunks.push(ev.data);
				};
				recorder.onstart = res;
			});
		};

		const stop = () => {
			return new Promise((res, rej) => {
				if (!recorder) rej("Not recording");
				else if (recorder.state == "inactive") res(blob());
				recorder.onstop = () => res(blob());
				recorder.stop();
				stream.getTracks().forEach((track) => track.stop());
			});
		};

		const pause = () => {
			return new Promise((res, rej) => {
				if (!recorder || recorder.state !== "recording") rej("Not recording");
				recorder.onstop = () => res(blob());
				recorder.stop();
				stream.getTracks().forEach((track) => track.stop());
			});
		};

		const resume = () => start(chunks);

		return {
			start,
			stop,
			pause,
			resume,
		};
	};

	const videoStream = async (props = { back: false, muted: false }) => {
		if (!permissions.microphone || permissions.microphone === "rejected") {
			const state = await requestPermission("audio");
			if (state === "rejected") throw new Error("Mic not found");
		}
		if (!permissions.camera || permissions.camera === "rejected") {
			const state = await requestPermission("video");
			if (state === "rejected") throw new Error("Video not found");
		}
		const stream = await getUserMedia({
			video: props.back ? { facingMode: "environment" } : true,
			audio: !props.muted,
		});

		let updateCallback,
			timer,
			chunks = [];
		const recorder = new MediaRecorder(stream);
		const tracks = stream.getVideoTracks();
		tracks.map((track) => {
			track.applyConstraints({
				echoCancellation: true,
				noiseSuppression: true.valueOf,
				channelCount: 1,
			});
			return track;
		});
		const src = new MediaStream(stream.getVideoTracks());
		recorder.start();
		recorder.ondataavailable = (e) => {
			chunks.push(e.data);
			updateCallback?.call(null, chunks);
		};
		timer = setInterval(() => recorder.requestData(), 100);

		return {
			src,
			stream,
			stop() {
				stream.getTracks().forEach((track) => track.stop());
				clearInterval(timer);
			},
			onDataChange(cb) {
				updateCallback = cb;
			},
		};
	};

	return {
		recordAudio,
		requestPermission,
		permissions,
		updatePermission,
		videoStream,
	};
}

export default useMedia;
