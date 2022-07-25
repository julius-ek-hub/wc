import Box from '@mui/material/Box';

import { darken, lighten, useTheme } from '@mui/material/styles';

import Close from '@mui/icons-material/Close';

import Center from '../../styled/common/Center';

// {/* <svg width="200" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ backgroundColor: 'yellowgreen' }}>
//     {/* <path d="M20,230 Q40,205 50,230 T90,230" fill={darkColor} stroke="blue" strokeWidth="5" /> */}
//     <path d="M 10 100 C 10 200, 190 200, 190 100 C 190 0, 100 50, 100 50 C 10 100, 10 10, 10 100" fill="none" stroke="blue" strokeWidth="5" />
// </svg> */}

function Mobile({ height = 140, width = 70, Content, ...rest }) {
    const { palette } = useTheme();

    const darkColor = darken(palette.secondaryHeaderBg, 0.6);
    const lightColor = lighten(palette.secondaryHeaderBg, 0.94);
    const darkBorder = `1px solid ${darkColor}`;

    const Bar = height => <Box width={4} height={height} bgcolor={darkColor} />

    return (
        <Box
            height={height}
            width={width}
            borderRadius={3}
            border={darkBorder}
            sx={{ boxSizing: 'border-box' }}
            bgcolor="secondaryHeaderBg"
            {...rest}
        >
            <Center
                height="calc(100% - 5px)"
                borderRadius={3}
                bgcolor="background.paper"
                border={darkBorder}>
                <Center
                    height="calc(100% - 10px)"
                    width="calc(100% - 10px)"
                    position="relative"
                    bgcolor={lightColor}
                    borderRadius={3}
                    border={darkBorder}>
                    {Content ? <Content /> : (
                        <Box display="flex" gap="2px" height="25px" alignItems="baseline" position="relative">
                            <Bar height="20%" />
                            <Bar height="40%" />
                            <Bar height="60%" />
                            <Bar height="80%" />
                            <Bar height="100%" />
                            <Close sx={{ position: 'absolute', left: -5, fontSize: 'unset' }} />
                        </Box>
                    )}
                    <Box borderRadius={2.5} width={5} height={5} border={darkBorder} position="absolute" top={8} left={8} />
                </Center>
            </Center>
        </Box>
    );
}

export default Mobile;