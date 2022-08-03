import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import IconButton from '../IconButton';
import Text from '../Text';
import Header from '../styled/Header';

function SecondaryHeader({ onClose, title }) {
    return (
        <Header br sx={{
            bgcolor: 'secondaryHeaderBg',
            padding: '60px 16px 10px 16px',
        }}>
            <IconButton
                onClick={onClose}
                Icon={ArrowBackIcon} sx={{ color: 'secondaryHeaderText' }} />
            <Text variant="h6" ml={1} color="secondaryHeaderText">{title}</Text>
        </Header>
    );
}

export default SecondaryHeader;