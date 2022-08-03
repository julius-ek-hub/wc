import Conversation from './Coversation';
import Status from './Status';
import WallpaperPreview from './WallpaperPreview';
import Calls from './Calls';

import * as Styled from '../../styled/Middle';

import useChats from '../../../hooks/useChats';
import useDimension from '../../../hooks/useDimension';

function Middle() {
    const { userInfoOpened } = useChats();
    const { mainLeftWidth, mainRightWidth } = useDimension();

    return (
        <Styled.Middle
            right={userInfoOpened ? mainRightWidth : 0}
            left={mainLeftWidth}>
            <Calls />
            <Conversation />
            <Status />
            <WallpaperPreview />
        </Styled.Middle>
    );
}

export default Middle;