import { useState } from 'react';

import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DropDownMenu from '../../../../DropDownMenu';
import IconButton from '../../../../IconButton';
import MenuItem from '../../../../MenuItem';
import Text from '../../../../Text';
import Confirm from '../../../../Confirm';
import Radio from '../../../../Radio';
import Check from '../../../Middle/Coversation/MessageMakeUp/Check';
import FileDescription from '../../../Middle/Coversation/MessageMakeUp/FileDescription';
import Deleted from '../../../Middle/Coversation/MessageMakeUp/Deleted';

import { date } from '../../../../../utils';
import useSettings from '../../../../../hooks/useSettings';
import useMessages from '../../../../../hooks/useMessages';
import useMessage from '../../../../../hooks/useMessage';

const Details = ({ details: c, showdivider = true }) => {

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [muteOpen, setMuteOpen] = useState(false);
    const { updateChat } = useSettings();
    const { lastMessage } = useMessages();
    const { deleted } = useMessage();

    const user = c.partnerInfo;
    const archived = c.archived;

    const lm = lastMessage(c.id);

    return (
        <ListItemText
            sx={{ mb: 0 }}
            primary={
                <Box display="flex" alignItems="center" justifyContent="space-between" pr={1}>
                    <Text>{user.givenName || user.telephone}</Text>
                    <Text fontSize="small">{date(lm?.receipt.sent).chat}</Text>
                </Box>
            }
            secondary={
                <>
                    <Box pr={1}>
                        <Text>
                            {lm.securityMessage ? `Messages and calls are end-to-end encrypted. No one outside of this chat, not even
                    us can read or listend to them. Tap to learn more` : (
                                <Check message={lm} sx={{ mb: -0.5 }} />
                            )}

                        </Text>
                        <FileDescription message={lm} />
                        <Text ml={0.2}>{deleted(lm) ? <Deleted message={lm} /> : lm?.message || ''}</Text>
                        <Box mr={2} display="flex" alignItems="center" ml="auto">
                            {c.muted && <VolumeOffIcon fontSize='small' />}
                            <Badge color="unread" badgeContent={c.unread} sx={{ ml: 2, color: theme => theme.palette.unread.text }} />
                            <DropDownMenu
                                horizontalDirection="left"
                                InvokeComponent={(props) => <IconButton className="dropdown-menu-button" sx={{ ml: 3, height: 23, width: 23, display: 'none' }} Icon={() => <ExpandMoreIcon fontSize='small' />} {...props} />}>
                                {archived ?
                                    <MenuItem label="Unarchive chat" onClick={() => updateChat(c.id, 'archived', false)} />
                                    :
                                    [
                                        <MenuItem label="Mute notifications" key="1" onClick={() => setMuteOpen(true)} />,
                                        <MenuItem label="Pin chat" key="2" />,
                                        <MenuItem label="Archive chat" key="3" onClick={() => updateChat(c.id, 'archived', true)} />
                                    ]
                                }

                                <MenuItem label="Delete chat" onClick={() => setDeleteOpen(true)} />
                                <MenuItem label="Mark as unread" />
                            </DropDownMenu>
                            <Confirm
                                open={deleteOpen}
                                acceptlabel='CONTINUE'
                                title="Changes to clearing or deleting a chat"
                                onAccept={() => setDeleteOpen(false)}
                                onRefuse={() => setDeleteOpen(false)}
                            >
                                <Text ellipsis={false} alpha={0.5}>
                                    Clearing or deleting entire chats will only remove messages from this device
                                    and your devices on the newer versions of WhatsApp
                                </Text>
                            </Confirm>
                            <Confirm
                                open={muteOpen}
                                title={`Mute ${user.givenName || user.telephone} for...`}
                                acceptlabel='MUTE NOTIFICATIONS'
                                onAccept={() => setMuteOpen(false)}
                                onRefuse={() => setMuteOpen(false)}
                            >
                                <Radio.Group>
                                    <Radio.Label label="8 Hours" value="8hrs" sx={{ mt: 0 }} />
                                    <Radio.Label label="1 Week" value="1wk" sx={{ mt: 0 }} />
                                    <Radio.Label label="Always" value="always" sx={{ mt: 0 }} />
                                </Radio.Group>
                            </Confirm>
                        </Box>
                    </Box>
                    <Divider sx={{ mt: 1.2, visibility: showdivider === 'true' ? 'visible' : 'hidden' }} />
                </>
            }
            secondaryTypographyProps={{ component: Box }}
        />
    )
}

export default Details;