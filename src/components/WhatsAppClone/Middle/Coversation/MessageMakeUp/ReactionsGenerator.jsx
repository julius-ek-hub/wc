import { useState } from 'react';

import Box from '@mui/material/Box';

import AddIcon from '@mui/icons-material/Add';

import DropDownMenu from '../../../../DropDownMenu';
import IconButton from '../../../../IconButton';
import Center from '../../../../styled/Center';
import EmojiPicker from '../../../../EmojiPicker';

import useMessage from '../../../../../hooks/useMessage';


function ReactionsGenerator({ InvokeComponent, onReact }) {

    const [open, setOpen] = useState(true);

    const { addReaction, myReaction, iSent } = useMessage();

    const mr = myReaction();


    const handleChoice = ({ slug, character }) => {
        setOpen(false);
        onReact?.call();
        addReaction({ slug, character });
    }

    return (
        <DropDownMenu
            onClose={() => {
                setOpen(false);
                onReact?.call();
            }}
            horizontalDirection={iSent ? 'right' : 'left'}
            sx={{
                '& .MuiMenu-paper': {
                    borderRadius: '30px',
                    pl: 1.5,
                    pr: 1.5,
                    transform: `translate(${iSent ? '50%' : '-50%'}, -150%) !important`
                }
            }}
            closeOnClick={false}
            open={open}
            InvokeComponent={({ onClick, ...rest }) => <InvokeComponent {...rest} onClick={(e) => {
                setOpen(true);
                onClick(e);
            }} />}>
            <Center>
                {
                    [
                        { character: '👍', slug: "thumbs-up" },
                        { character: '❤️', slug: "e0-6-red-heart" },
                        { character: '😂', slug: "face-with-tears-of-joy" },
                        { character: '😮', slug: "face-with-open-mouth" },
                        { character: '🙏', slug: "e0-6-folded-hands" },
                    ].map((emoji) => (
                        <IconButton
                            key={emoji.slug}
                            Icon={() => emoji.character}
                            {...(mr?.slug === emoji.slug) && {
                                sx: { bgcolor: 'rgba(0,0,0, 0.1)' }
                            }}
                            color="primary"
                            onClick={() => handleChoice(emoji)} />
                    ))}
                <DropDownMenu
                    open={open}
                    closeOnClick={false}
                    InvokeComponent={props => <IconButton Icon={AddIcon} isx={{ fontSize: '2rem' }} {...props} />}>
                    <Box height={250} width={500}>
                        <EmojiPicker onPicked={handleChoice} />
                    </Box>
                </DropDownMenu>
            </Center>
        </DropDownMenu>
    );
}

export default ReactionsGenerator;