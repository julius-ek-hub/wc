import AgoraRTC from "agora-rtc-sdk-ng";
import { useRef, useState } from "react";

import useSettings from "./useSettings";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

function useRTC() {
	const [localTracks, setLocalTracks] = useState([]);
	const [uniqueRemoteTracks, setRemotTracks] = useState({});
	const [myUID, setMyUID] = useState();
	const { RTC_APPID } = useSettings();

	const onRMleave = useRef();

	const handleJoin = async (user, mediaType) => {
		let extistingUsers = { ...uniqueRemoteTracks };
		extistingUsers[user.uid] = user;
		await client.subscribe(user, mediaType);
		setRemotTracks(extistingUsers);
	};
	const handleLeave = (user) => {
		let extistingUsers = { ...uniqueRemoteTracks };
		delete extistingUsers[user.uid];
		setRemotTracks(extistingUsers);
		onRMleave.current?.call(null, user);
	};

	const joinAndDisplayLocalStream = async (
		{ uid, cname, token } = {},
		type,
	) => {
		const connecting = client.connectionState === "CONNECTING";
		const connected = client.connectionState === "CONNECTED";
		if (connecting || connected) return;

		client.on("user-published", handleJoin);
		client.on("user-left", handleLeave);
		// client.on("user-unpublished", () => console.log("cam ch"));
		let myuid = await client.join(RTC_APPID, cname, token, uid);
		const request =
			type === "audio"
				? "createMicrophoneAudioTrack"
				: "createMicrophoneAndCameraTracks";
		const tracks = await AgoraRTC[request]();
		setMyUID(myuid);
		setLocalTracks(tracks);
		await client.publish(tracks);
	};

	const stopLocalStream = async () => {
		try {
			client.localTracks.forEach((track) => track.close());
			await client.leave();
			setLocalTracks([]);
			setRemotTracks([]);
			setMyUID(null);
		} catch (e) {
			console.log(e);
		}
	};

	return {
		myUID,
		localTracks,
		remoteTracks: Object.values(uniqueRemoteTracks),
		joinAndDisplayLocalStream,
		stopLocalStream,
		onRemoteLeave(fn) {
			onRMleave.current = fn;
		},
	};
}

export default useRTC;
