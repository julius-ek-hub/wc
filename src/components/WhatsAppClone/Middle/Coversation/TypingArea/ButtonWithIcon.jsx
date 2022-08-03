import Box from '@mui/material/Box';

import IconButton from '../../../../IconButton';
import Animate from '../../../../Animate';

const ButtonWithIcon = ({ isx, show = true, animate = true, direction = "right", type, children, ...rest }) => {

    let button = <Box position="relative"><IconButton isx={{ fontSize: 28, ...isx }} {...rest} />{children}</Box>

    if (!animate) {
        if (show) return button;
        return null;
    }

    return (
        <Animate in={Boolean(show)} direction={direction} type={type}>
            {button}
        </Animate>
    )
}

export default ButtonWithIcon;