import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import SecondaryHeader from '../SecondaryHeader';
import Animate from '../../Animate';

function Sub({
    open,
    title,
    onClose,
    children,
    animationtype = "slide",
    header,
    footer,
    animationDirection = "left",
    sx,
    Component = Box,
    ...rest
}) {

    return (
        <Animate
            animationtype={animationtype}
            direction={animationDirection}
            in={open}>
            <Stack height="100%">
                {header ? header : <SecondaryHeader title={title} onClose={onClose} />}
                <Component
                    flexGrow={1}
                    overflow="auto"
                    className='custom-scrollbar'
                    bgcolor="primaryHeaderBg"
                    {...rest}>
                    {children}
                </Component>
                {footer}
            </Stack>
        </Animate>
    );
}

Sub.Container = ({ children, Component = Box, ...rest }) => (
    <Component bgcolor="background.paper" {...rest}>
        {children}
    </Component>
);

export default Sub;