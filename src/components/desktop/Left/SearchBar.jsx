import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterListIcon from '@mui/icons-material/FilterList';

import TextField from "../../common/TextField";


function SearchBar({ placeholder, onSearch, hideArrowIcon, showFilterIcon, sx }) {

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: 'primaryHeaderBg',
                borderRadius: 2,
                flexGrow: 1,
                pl: 1,
                pr: 1,
                m: 1,
                ...sx
            }}>
                {!hideArrowIcon && <IconButton disableRipple><SearchRoundedIcon /></IconButton>}
                <TextField
                    placeholder={placeholder}
                    size="small"
                    sx={{
                        bgcolor: 'transparent',
                        ml: 0,
                        mr: 0
                    }} />
            </Box>
            {showFilterIcon && (
                <Box sx={{ mr: 1 }}>
                    <IconButton><FilterListIcon /></IconButton>
                </Box>
            )}
        </Box>
    );
}

export default SearchBar;