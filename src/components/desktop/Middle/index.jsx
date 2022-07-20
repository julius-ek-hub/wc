import Conversation from './Coversation';
import Status from './Status';
import * as Styled from '../../styled/desktop/Middle';

import useChats from '../../../hooks/useChats';
import useDimension from '../../../hooks/useDimension';

function Middle() {
    const { userInfoOpened } = useChats();
    const { mainLeftWidth, mainRightWidth } = useDimension();

    return (
        <Styled.Middle
            right={userInfoOpened ? mainRightWidth : 0}
            left={mainLeftWidth}>
            <Conversation />
            <Status />
        </Styled.Middle>
    );
}

export default Middle;