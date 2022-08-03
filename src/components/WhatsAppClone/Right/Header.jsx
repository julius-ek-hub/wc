import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import IconButton from '../../IconButton';
import StyledHeader from '../../styled/Header';
import Text from '../../Text';

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