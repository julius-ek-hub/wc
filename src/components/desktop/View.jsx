import Box from '@mui/material/Box';

import * as Styled from '../styled/desktop/View';

function DesktopView({ children }) {
    return (
        <Styled.DesktopView>
            <Box />
            <Box>
                <Box>
                    {children}
                </Box>
            </Box>
        </Styled.DesktopView>
    );
}

export default DesktopView;