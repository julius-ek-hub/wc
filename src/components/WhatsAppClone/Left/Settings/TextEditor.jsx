import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import EditIcon from '@mui/icons-material/Edit';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CheckIcon from '@mui/icons-material/Check';

import Text from '../../../Text';
import IconButton from '../../../IconButton';
import EmojiPicker from '../../../EmojiPicker';
import DropdownMenu from '../../../DropDownMenu';

import { insertEmoji } from '../../../../utils';


function TextEditor({ onChange, defaultValue, label, max = 255, multiline = false, ...rest }) {

    const [result, setResult] = useState(defaultValue || '');
    const [editing, setEditing] = useState();
    const inputRef = useRef()

    const handleTextChane = (e) => {
        if (result.length >= max && e.nativeEvent.data) return;
        setResult(e.target.value)
    }

    const handleEmojiChange = (value) => {
        const ta = inputRef.current;
        if (ta.value.length >= max) return;
        insertEmoji(value.character, ta);
        setResult(ta.value);
        ta.focus();
    }

    const handleUpdate = () => {
        if (defaultValue === result) return;
        setEditing(false);
        onChange?.call(null, result);
    }

    return (
        <Box {...rest}>
            <TextField
                fullWidth
                multiline={multiline}
                onChange={handleTextChane}
                variant="standard"
                value={result}
                disabled={!editing}
                label={label}
                sx={{ alignItems: 'flex-start' }}
                inputRef={inputRef}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            {editing ? (
                                <>
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
                                    <IconButton Icon={() => <CheckIcon sx={{ fontSize: '20px' }} />} onClick={handleUpdate} />
                                </>
                            )
                                :
                                <IconButton Icon={() => <EditIcon sx={{ fontSize: '20px' }} />} onClick={() => setEditing(true)} />
                            }

                        </InputAdornment>
                    )
                }}
                focused />
        </Box >
    );
}

export default TextEditor;