import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SearchBar() {
    return (
        <Box>
            <Box sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'primaryHeaderBg', borderRadius: 2, pl: 1, pr: 1 }}>
                    <IconButton><SearchRoundedIcon /></IconButton>
                    <TextField placeholder="Search public contacts" size="small" sx={{
                        flexGrow: 1,
                        border: 'none',
                        '& .Mui-focused fieldset, & fieldset': {
                            borderWidth: '0px !important',
                            borderColor: 'unset !important'
                        }
                    }} />
                </Box>
            </Box>
        </Box>
    );
}

export default SearchBar;