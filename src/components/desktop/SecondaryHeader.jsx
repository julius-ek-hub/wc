import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import IconButton from '../common/IconButton';
import Text from '../common/Text';
import Header from '../styled/desktop/Header';

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