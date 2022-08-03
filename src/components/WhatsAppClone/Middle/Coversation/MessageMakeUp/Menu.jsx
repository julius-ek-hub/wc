import { useState } from 'react';

import Box from '@mui/material/Box';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import DropDownMenu from '../../../../DropDownMenu';
import MenuItem from '../../../../MenuItem';
import IconButton from '../../../../IconButton';
import ReactionsGenerator from './ReactionsGenerator';
import ConfirmDeleteOne from './ConfirmDeleteOne';

import useMessage from '../../../../../hooks/useMessage';
import useMessages from '../../../../../hooks/useMessages';
import useChats from '../../../../../hooks/useChats';

function Menu() {
    const [open, setOpen] = useState(true);

    const { message, setReplyIngTo, startMessage, starred, iSent, deleted } = useMessage();
    const { select, selecting } = useMessages();

    if (message._new || selecting) return null;

    return (

        <Box className="drop-menu">
            <Box>
                <DropDownMenu
                    open={open}
                    closeOnClick={false}
                    horizontalDirection={iSent ? 'right' : 'left'}
                    InvokeComponent={({ onClick, ...rest }) => (
                        <IconButton
                            onClick={e => {
                                setOpen(true);
                                onClick(e);
                            }}
                            Icon={KeyboardArrowDownIcon}
                            {...rest} />
                    )}>
                    {!deleted() && (
                        <Box>
                            <MenuItem label="Reply" onClick={() => {
                                setReplyIngTo(message);
                                setOpen(false);
                            }} />
                            <ReactionsGenerator
                                onReact={() => setOpen(false)}
                                InvokeComponent={props => <MenuItem label="React to message" {...props} />} />
                            <MenuItem label="Forward message" onClick={() => {
                                setOpen(false);
                                select(message._id);
                            }} />
                            <MenuItem label={`${starred ? 'Unstar' : 'Star'} message`} onClick={() => {
                                startMessage([message._id]);
                                setOpen(false);
                            }} />
                            <MenuItem label="Copy text in message" />
                        </Box>
                    )}
                    <ConfirmDeleteOne label="Delete message"
                        onChoiceMade={() => setOpen(false)} />
                </DropDownMenu>
            </Box>
        </Box>

    );
}

export default Menu;