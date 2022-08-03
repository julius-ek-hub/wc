import { useState, useRef } from "react";

import { recordTime } from "../utils";

function useAudioPlayer(fallbackDuration) {
	/**
	 * @type {{current: HTMLAudioElement}}
	 */
	const ref = useRef();

	const [playBackCurrentTime, setPlayBackCurrentTime] = useState(0);
	const [playBackSliderPosition, setPlayBackSliderCurrentPosition] =
		useState(0);
	const [playBackState, setPlayBackState] = useState({});

	const audioDuration = (duration) =>
		duration === Infinity ? fallbackDuration : duration;

	const updatePlayBackState = (update) => {
		setPlayBackState({
			...playBackState,
			...update,
		});
	};

	const listenForPlayBackChanges = () => {
		const audioEl = ref.current;
		audioEl.ontimeupdate = () => {
			const duration = audioDuration(audioEl.duration);
			const ct = audioEl.currentTime;
			setPlayBackCurrentTime(ct);
			setPlayBackSliderCurrentPosition((ct / duration) * 100);
		};

		audioEl.onended = () => (audioEl.currentTime = 0);
		audioEl.onplaying = () => updatePlayBackState({ playing: true });
		audioEl.onpause = () => updatePlayBackState({ playing: false });
	};

	const togglePlayBack = async () => {
		listenForPlayBackChanges();
		if (playBackState.error) return;
		const audioEl = ref.current;
		audioEl.paused
			? audioEl.play().catch(() => updatePlayBackState({ error: true }))
			: audioEl.pause();
	};

	const handlerPlaySliderChange = (e, position) => {
		try {
			if (playBackState.error || playBackState.loading) return;
			listenForPlayBackChanges();
			const audioEl = ref.current;
			const duration = audioDuration(audioEl.duration);
			audioEl.currentTime = (position * duration) / 100;
		} catch (e) {}
	};

	return {
		handlerPlaySliderChange,
		togglePlayBack,
		playBackCurrentTime: recordTime(playBackCurrentTime),
		playBackSliderPosition,
		ref,
		state: playBackState,
		updatePlayBackState,
	};
}

export default useAudioPlayer;
