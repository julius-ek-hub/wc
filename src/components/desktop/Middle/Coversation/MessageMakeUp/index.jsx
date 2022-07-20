import Box from '@mui/material/Box';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import DropDownMenu from '../../../../common/DropDownMenu';
import MenuItem from '../../../../common/MenuItem';
import IconButton from '../../../../common/IconButton';
import Text from '../../../../common/Text';

import * as Styled from '../../../../styled/desktop/MessageMakup';

import StickyDate from './StickyDate';
import ReplyContainer from './ReplyContainer';
import Menu from './Menu';

import useMessage from '../../../../../hooks/useMessage';
import useSettings from '../../../../../hooks/useSettings';

function MessageMakeUp() {

    const { message: m, previous } = useMessage();
    const { settings } = useSettings();

    const incoming = settings._id != m.sender._id;
    const sameGroup = previous && (previous.sender._id === m.sender._id);

    return (
        <>
            <StickyDate previous={previous} now={m} />
            <Styled.MessageMakeUp id={m._id} incoming={incoming} sameGroup={sameGroup}>
                <Box className='message'>
                    <ReplyContainer replyingTo={m.replyingTo} />
                    <Box p={1}>
                        <Box mr={3}>
                            <Text ellipsis={false} component="div" sx={{ wordBreak: 'break-all' }}>
                                {(m.message || '').split('\n').map((p, key) => <Text ellipsis={false} key={key}>{p}</Text>)}
                            </Text>
                        </Box>
                        <Menu />
                        <Box className="date">
                            11:02 am
                        </Box>
                    </Box>
                </Box>
            </Styled.MessageMakeUp>
        </>
    );
}

export default MessageMakeUp;