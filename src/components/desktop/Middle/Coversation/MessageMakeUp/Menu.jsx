import Box from '@mui/material/Box';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import DropDownMenu from '../../../../common/DropDownMenu';
import MenuItem from '../../../../common/MenuItem';
import IconButton from '../../../../common/IconButton';


import useMessage from '../../../../../hooks/useMessage';
import useSettings from '../../../../../hooks/useSettings';

function Menu() {

    const { message: m, setReplyIngTo } = useMessage();
    const { settings } = useSettings();

    const incoming = settings._id != m.sender._id;

    return (

        <Box className="drop-menu">
            <Box>
                <DropDownMenu
                    horizontalDirection={incoming ? 'left' : 'right'}
                    InvokeComponent={props => <IconButton Icon={KeyboardArrowDownIcon} {...props} />}>
                    <MenuItem label="Reply" onClick={() => setReplyIngTo(m)} />
                    <MenuItem label="React to message" />
                    <MenuItem label="Forward message" />
                    <MenuItem label="Star message" />
                    <MenuItem label="Delete message" />
                    <MenuItem label="Copy text in message" />
                </DropDownMenu>
            </Box>
        </Box>

    );
}

export default Menu;