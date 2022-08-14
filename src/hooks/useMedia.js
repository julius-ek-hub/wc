function useMedia() {
	const getUserMedia = (query) => {
		const media = navigator.mediaDevices || navigator;
		return media.getUserMedia(query);
	};

	const requestPermission = async (type) => {
		const stream = await getUserMedia({ [type]: true });
		stream.getTracks().forEach((track) => track.stop());
	};

	const recordAudio = async () => {
		await requestPermission("audio");

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

	return {
		recordAudio,
	};
}

export default useMedia;
