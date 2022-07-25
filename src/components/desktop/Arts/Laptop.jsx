import Box from '@mui/material/Box';

import { darken, lighten, useTheme } from '@mui/material/styles';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Center from '../../styled/common/Center';

function Laptop({ height = 200, width = 250, ...rest }) {
    const { palette } = useTheme();

    const darkColor = darken(palette.secondaryHeaderBg, 0.6);
    const lightColor = lighten(palette.secondaryHeaderBg, 0.94);
    const darkBorder = `1px solid ${darkColor}`;

    return (

        <Center
            height={height}
            width={width}
            borderRadius={3}
            flexDirection="column"
            position="relative"
            {...rest}
        >
            <Center
                flexGrow={1}
                borderRadius={3}
                width="80%"
                bgcolor="background.paper"
                border={darkBorder}>
                <Center
                    height="calc(100% - 10px)"
                    width="calc(100% - 10px)"
                    position="relative"
                    bgcolor={lightColor}
                    borderRadius={3}
                    border={darkBorder}>
                    <CheckCircleIcon sx={{
                        fontSize: '4rem', color: 'secondaryHeaderBg', '& path': {
                            stroke: darkColor,
                            strokeWidth: 0.5
                        }
                    }} />
                </Center>
            </Center>
            <Box height={3}
                width="20%"
                bgcolor="background.paper"
                position="absolute"
                border={darkBorder}
                borderTop="none"
                bottom={11} />
            <Box width="100%">
                <Box height={5} border={darkBorder} width="90%" ml="5%" borderRadius={0.4} />
                <Box height={5} border={darkBorder} bgcolor="secondaryHeaderBg" borderRadius={0.4} />
            </Box>
        </Center>
    );
}

export default Laptop;