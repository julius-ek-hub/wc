import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import IconButton from '../../common/IconButton';
import StyledHeader from '../../styled/desktop/Header';
import Text from '../../common/Text';

import useChats from '../../../hooks/useChats';

function Header() {
    const { setUserInfoOpen } = useChats();

    return (
        <StyledHeader component="header" bl>
            <IconButton onClick={() => setUserInfoOpen(false)} Icon={CloseRoundedIcon} />
            <Text>Contact info</Text>
        </StyledHeader >
    );
}

export default Header;