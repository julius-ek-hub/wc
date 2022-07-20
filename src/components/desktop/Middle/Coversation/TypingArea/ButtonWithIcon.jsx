import Box from '@mui/material/Box';

import IconButton from '../../../../common/IconButton';
import Animate from '../../../../common/Animate';

const ButtonWithIcon = ({ isx, show = true, animate = true, ...rest }) => {

    let button = <Box><IconButton isx={{ fontSize: 28, ...isx }} {...rest} /></Box>

    if (!animate) {
        if (show) return button;
        return null;
    }

    return (
        <Animate in={Boolean(show)} direction="right">
            {button}
        </Animate>
    )
}

export default ButtonWithIcon;