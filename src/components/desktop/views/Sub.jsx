import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import SecondaryHeader from '../SecondaryHeader';
import Animate from '../../common/Animate';

function Sub({
    open,
    title,
    onClose,
    children,
    animationType = "slide",
    header,
    footer,
    animationDirection = "left",
    sx,
    ...rest
}) {

    return (
        <Animate
            animationType={animationType}
            direction={animationDirection}
            in={open}>
            <Stack>
                {header ? header : <SecondaryHeader title={title} onClose={onClose} />}
                <Box
                    flexGrow={1}
                    overflow="auto"
                    className='custom-scrollbar'
                    bgcolor="primaryHeaderBg"
                    {...rest}>
                    {children}
                </Box>
                {footer}
            </Stack>
        </Animate>
    );
}

Sub.Container = ({ children, ...rest }) => (
    <Box bgcolor="background.paper" p={3} {...rest}>
        {children}
    </Box>
);

export default Sub;