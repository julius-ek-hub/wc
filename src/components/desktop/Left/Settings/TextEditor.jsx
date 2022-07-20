import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import EditIcon from '@mui/icons-material/Edit';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import Text from '../../../common/Text';
import IconButton from '../../../common/IconButton';
import EmojiPicker from '../../../common/EmojiPicker';
import DropdownMenu from '../../../common/DropDownMenu';

import { insertEmoji } from '../../../../utils';


function TextEditor({ onChange, defaultValue, label, max = 255, multiline = false, ...rest }) {

    const [result, setResult] = useState(defaultValue || '');
    const inputRef = useRef()

    const handleTextChane = (e) => {
        if (result.length >= max && e.nativeEvent.data) return;
        setResult(e.target.value)
    }

    const handleEmojiChange = (value) => {
        if (result.length >= max) return;
        const ta = inputRef.current;
        insertEmoji(value.character, ta)
        setResult(ta.value);
        ta.focus();
    }

    return (
        <Box {...rest}>
            <TextField
                fullWidth
                multiline={multiline}
                onChange={handleTextChane}
                variant="standard"
                value={result}
                label={label}
                sx={{ alignItems: 'flex-start' }}
                inputRef={inputRef}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <Text>{max - result.length}</Text>
                            <DropdownMenu
                                closeOnClick={false}
                                horizontalDirection="left"
                                InvokeComponent={props => (
                                    <IconButton
                                        isx={{ fontSize: '20px' }}
                                        sx={{ mr: -1 }}
                                        Icon={SentimentSatisfiedAltIcon}
                                        {...props} />
                                )}>
                                <Box width={400} height={200}>
                                    <EmojiPicker onPicked={handleEmojiChange} />
                                </Box>
                            </DropdownMenu>
                            <IconButton Icon={() => <EditIcon sx={{ fontSize: '20px' }} />} />
                        </InputAdornment>
                    )
                }}
                focused />
        </Box >
    );
}

export default TextEditor;