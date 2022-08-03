import { useState } from "react";
import Box from "@mui/material/Box";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowBack from "@mui/icons-material/ArrowBack";

import TextField from "../../TextField";
import IconButton from "../../IconButton";


function SearchBar({
    placeholder,
    onSearch,
    hideArrowIcon,
    filterByUnread,
    onFilter,
    showFilterIcon, sx }) {
    const [blur, setBlur] = useState(true);

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
                {!hideArrowIcon && (
                    <IconButton disableRipple Icon={blur ? SearchRoundedIcon : ArrowBack} />
                )}
                <TextField
                    placeholder={placeholder}
                    onFocus={() => setBlur(false)}
                    onBlur={() => setBlur(true)}
                    onChange={e => onSearch && onSearch(e.target.value)}
                    size="small"
                    sx={{
                        bgcolor: 'transparent',
                        ml: 0,
                        mr: 0
                    }} />
            </Box>
            {showFilterIcon && (
                <Box sx={{ mr: 1 }}>
                    <IconButton
                        onClick={onFilter}
                        Icon={FilterListIcon}
                        {...(filterByUnread && {
                            sx: {
                                color: 'common.white',
                                bgcolor: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'primary.main'
                                }
                            }
                        })}
                    />
                </Box>
            )}
        </Box>
    );
}

export default SearchBar;