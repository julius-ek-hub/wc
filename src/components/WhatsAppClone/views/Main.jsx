import Box from '@mui/material/Box';

import * as Styled from '../../styled/View';

function MainView({ children }) {
    return (
        <Styled.MainView>
            <Box />
            <Box>
                <Box>{children}</Box>
            </Box>
        </Styled.MainView>
    );
}

export default MainView;