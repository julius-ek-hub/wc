import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';

import MenuItem from '../../../../MenuItem';
import Dialog from '../../../../Dialog';
import Button from '../../../../styled/Button';


import useMessage from '../../../../../hooks/useMessage';
import useSettings from '../../../../../hooks/useSettings';
import useMessages from '../../../../../hooks/useMessages';
import Center from '../../../../styled/Center';


const Btn = props => (
    <Center justifyContent="flex-end !important">
        <Button border {...props} />
    </Center>
)

function ConfirmDeleteOne({ onChoiceMade }) {
    const [open, setOpen] = useState(false);

    const { message, iSent, deletMessage, deleted } = useMessage();
    const { select } = useMessages();
    const date = new Date().getTime();
    const messageDate = new Date(message.receipt.sent).getTime();
    const canDelete4Two = (((date - messageDate) / 1000) / 60 / 60) <= 1 && !deleted();

    const handleDelete = (type) => () => {
        deletMessage([message._id], type);
        setOpen(false);
        onChoiceMade();
    }

    return (

        <>
            <MenuItem label="Delete message" onClick={() => {
                if (!iSent) return select(message._id);
                setOpen(true);
            }} />
            <Dialog
                open={open}
                title="Delete message?"
            >
                <Stack justifyContent="flex-end" rowGap={1}>
                    {canDelete4Two && <Btn border onClick={handleDelete(2)}>DELETE FOR EVERYONE</Btn>}
                    <Btn border onClick={handleDelete(1)}>DELETE FOR ME</Btn>
                    <Btn border onClick={() => {
                        setOpen(false);
                        onChoiceMade();
                    }}>CANCEL</Btn>
                </Stack>
            </Dialog>
        </>
    );
}

export default ConfirmDeleteOne;