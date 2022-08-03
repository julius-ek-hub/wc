import { useContext } from "react";

import MessageContext from "../contexts/MessageContext";
import useChats from "./useChats";

import useConnection from "./useConnection";
import useMessages from "./useMessages";
import useSettings from "./useSettings";

const useMessage = (customId) => {
	const messageId = useContext(MessageContext);
	const { messages, setReplyIngTo, replaceMessage, selected } = useMessages();
	const conn = useConnection();
	const { _id, simpleInfo } = useSettings();
	const { active, chatInfo, getChats } = useChats();

	const index = messages.findIndex(
		({ _id }) => _id === (customId || messageId),
	);
	const message = messages[index];
	const previous = messages[index - 1];

	const iSent = message?.senderId === _id;
	const sameGroup =
		previous &&
		previous.senderId === message?.senderId &&
		(!previous.reactions || previous.reactions.length === 0);

	const sender = iSent ? simpleInfo : chatInfo(message?.chatId);
	const deleted = (m = message) => m.deleted.find((d) => d.types.includes(2));

	const myReaction = (m) =>
		(m || message).reactions.find((r) => {
			return r.reactors.map((r) => r._id).includes(_id);
		});

	const send = async (custom) => {
		const m = { ...message };
		if (!m._new) return;

		const partnerId = chatInfo(m.chatId).partnerInfo._id;
		if (m.file) {
			const f = { ...m.file };
			let raw = await fetch(f.url);
			const blob = await raw.blob();

			let file = new File([blob], `${m._id}.${blob.type.split("/")[1]}`, {
				type: blob.type,
				lastModified: Date.now(),
			});

			const { data: secureURL } = await conn.emit("s3-url", {
				ext: file.type.split("/")[1],
				folder: `chats/${m.chatId}/`,
			});
			await fetch(secureURL, {
				body: file,
				method: "PUT",
				headers: { "Content-Type": "multipart/form-data" },
			});

			f.url = secureURL.split("?")[0];
			m.file = f;
		}

		const { data } = await conn.emit("new-message", {
			message: m,
			partnerId,
		});

		replaceMessage(messageId, data.message);
		if (data.isNewChat) getChats();
	};

	const update = async (update, custom) => {
		const _message = custom?.message || message;
		const partnerId = custom?.partnerId || chatInfo(active).partnerInfo._id;

		const { data } = await conn.emit("update-message", {
			messageId,
			update,
			chatId: _message.chatId,
			partnerId,
		});

		replaceMessage(messageId, data);
	};

	const setSeen = () => {
		if (iSent || message.securityMessage) return;

		if (message.receipt.seen.some((user) => user._id === _id)) return;

		update({
			$push: {
				"receipt.seen": {
					_id,
					date: new Date().toISOString(),
				},
			},
		});
	};

	const deletMessage = async (_ids = [], type) => {
		let _messages = [...messages];
		_ids.forEach((id) => {
			let toDelete = { ..._messages.find((_message) => _message._id === id) };
			let deleted = [...toDelete.deleted];
			const findMyDeletes = (d) => d._id === _id;
			let myDeletes = deleted.find(findMyDeletes);
			let myDeletesIndex = deleted.findIndex(findMyDeletes);
			if (!myDeletes) {
				deleted.push({ _id, types: [type] });
				toDelete.deleted = deleted;
			} else {
				const _myDeletes = { ...myDeletes };
				const types = [..._myDeletes.types];
				types.push(type);
				_myDeletes.types = types;
				deleted.splice(myDeletesIndex, 1, _myDeletes);
				toDelete.deleted = deleted;
			}
			replaceMessage(toDelete._id, toDelete);
			update({ deleted });
		});
	};

	const starMessage = async (_ids = [], custom) => {
		let _messages = [...messages];

		_ids.forEach((id) => {
			let _toStar = { ..._messages.find((_message) => _message._id === id) };
			let oldStars = [..._toStar.starredBy];
			if (oldStars.includes(_id)) {
				const index = oldStars.findIndex((__id) => __id === id);
				oldStars.splice(index, 1);
			} else oldStars.push(_id);
			_toStar.starredBy = oldStars;
			replaceMessage(_toStar._id, _toStar);
			update({ starredBy: oldStars });
		});
	};

	const addReaction = ({ character, slug }, custom) => {
		const _message = { ...message };
		let reactions = [..._message.reactions];

		const done = (reactions) => {
			_message.reactions = reactions;
			replaceMessage(_message._id, _message);

			update({ reactions });
		};

		const picker = ({ reactors }) =>
			reactors.map((reactor) => reactor._id).includes(_id);

		let or = reactions.find(picker);
		let oldReactionIndex = reactions.findIndex(picker);

		if (or) {
			let oldReaction = { ...or };
			let oldReactors = [...oldReaction.reactors];
			oldReactors = oldReactors.filter((reactor) => reactor._id !== _id);
			oldReaction.reactors = oldReactors;
			if (oldReactors.length === 0) reactions.splice(oldReactionIndex, 1);
			else reactions.splice(oldReactionIndex, 1, oldReaction);

			if (oldReaction.slug === slug) return done(reactions);
		}

		const ex = reactions.find((reaction) => reaction.slug === slug);
		const exIndex = reactions.findIndex((reaction) => reaction.slug === slug);

		if (ex) {
			const existingReaction = { ...ex };
			let oldReactors = [...existingReaction.reactors];
			oldReactors = oldReactors.filter((reactor) => reactor._id !== _id);
			existingReaction.reactors = oldReactors;
			if (oldReactors.length === 0) reactions.splice(exIndex, 1);
			else reactions.splice(exIndex, 1, existingReaction);
		} else {
			reactions.push({
				character,
				slug,
				reactors: [{ _id }],
			});
		}

		done(reactions);
	};

	return {
		/**
		 * @type {{}}
		 */
		message,
		index,
		previous,
		sameGroup,
		selected: selected.includes(message?._id),
		starred: message?.starredBy.includes(_id),
		iSent,
		sender,
		deleted,
		setSeen,
		setReplyIngTo,
		startMessage: starMessage,
		deletMessage,
		send,
		update,
		addReaction,
		myReaction,
	};
};

export default useMessage;
