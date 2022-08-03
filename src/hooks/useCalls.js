import { useState, useEffect, useRef } from "react";

import useRTC from "./useRTC";
import useSettings from "./useSettings";
import useConnection from "./useConnection";
import useChats from "./useChats";

import { sleep, recordTime } from "../utils";

function useCalls() {
	const [state, setState] = useState({});
	const [to, setTo] = useState({});
	const [status, setStatus] = useState("");
	const {
		joinAndDisplayLocalStream,
		myUID,
		localTracks,
		remoteTracks,
		stopLocalStream,
		onRemoteLeave,
	} = useRTC();

	const conn = useConnection();

	const { call, _id, updateSettings } = useSettings();
	const { chatInfoFromUserId } = useChats();
	const callDurationTimer = useRef();
	const callDuration = useRef(0);

	const update = (_update) => {
		setState({
			...state,
			..._update,
		});
	};

	const stopTimer = () => clearInterval(callDurationTimer.current);

	const startTimer = () => {
		stopTimer();
		callDurationTimer.current = setInterval(() => {
			callDuration.current++;
			setStatus(recordTime(callDuration.current));
		}, 1000);
	};

	const mute = (index, key) => {
		const track = call.type === "video" ? localTracks[index] : localTracks;
		let muted = track.muted;
		track.setMuted(!muted);
		update({ [key]: !muted });
	};

	const onMicMute = () => mute(0, "muted");

	const onCamOff = () => mute(1, "camOff");

	const endCall = async (message) => {
		setState({ ...state, ended: true });
		await stopLocalStream();
		setStatus(typeof message === "string" ? message : "Call ended");
		await sleep(1000);
		updateSettings("call", undefined);
		setState({});
		setTo({});
		stopTimer();
		callDurationTimer.current = 0;
		setStatus("");
		conn.removeListeners([`declined-${call.from._id}`]);
	};

	const playStreams = () => {
		if (state.ended) return;

		call.type === "video"
			? localTracks[1].play(`user-${myUID}`)
			: localTracks.play(`user-${myUID}`);
		if (remoteTracks.length > 0) {
			startTimer();
			remoteTracks[0]._videoTrack?.play(`user-${remoteTracks[0].uid}`);
		}
		onRemoteLeave(endCall);
	};

	const joinCall = async (_rtc) => {
		update({ loading: true });
		setStatus(
			"Connecting " + (call.type === "audio" ? "microphone" : "camera"),
		);
		const { data } = await conn.emit("rtc-token", _rtc);
		const rtc = { ..._rtc, token: data };
		await joinAndDisplayLocalStream(rtc, call.type);
		update({ loading: false });
	};

	const acceptCall = () => update({ accepted: true });

	const rejectCall = async () => {
		await conn.emit("declined", call.from._id);
		endCall();
	};

	useEffect(() => {
		if (call && !state.loading && !state.ended) {
			const from = call.from;
			const to = call.to;
			let _to = to;
			let iCalled = true;

			if (from._id !== _id) {
				_to = from;
				iCalled = false;
			}

			setTo(_to);

			if (localTracks.length === 0 && !state.ended) {
				const cname = chatInfoFromUserId(_to._id)?.id;
				if (!cname) return;
				if (!iCalled) {
					if (state.accepted)
						joinCall({ uid: to._id, cname, role: "subscriber" }).catch(endCall);
				} else {
					joinCall({ uid: _id, cname, role: "publisher" })
						.then(() => {
							conn.emit("call", { ...call }).then(() => {
								setStatus("Calling");
								conn.on(`declined-${_id}`, () => endCall("Declined"));
								conn.on(`ringing-${_id}`, () => setStatus("Ringing"));
							});
						})
						.catch(endCall);
				}
			} else playStreams();
		}
	}, [call, localTracks.length, remoteTracks.length, state]);

	return {
		endCall,
		rejectCall,
		acceptCall,
		onCamOff,
		onMicMute,
		myUID,
		remoteTracks,
		localTracks,
		state,
		to,
		status,
		call,
		_id,
	};
}

export default useCalls;
