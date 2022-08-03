import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

import ButtonWithIcon from '../ButtonWithIcon';
import Confirm from '../../../../../Confirm';
import CheckBox from '../../../../../CheckBox';

import useMessages from '../../../../../../hooks/useMessages';
import Center from '../../../../../styled/Center';
import Text from '../../../../../Text';


function ConfirmDeleteSelected({ onChoiceMade }) {
    const [open, setOpen] = useState(false);

    const { resetSelect } = useMessages();

    return (

        <>
            <ButtonWithIcon Icon={DeleteIcon} onClick={() => setOpen(true)} />
            <Confirm
                open={open}
                title="Delete message"
                acceptlabel='DELETE FOR ME'
                onAccept={() => {
                    resetSelect();
                    setOpen(false)
                }}
                onRefuse={() => setOpen(false)}
            >
                <Center justifyContent="flex-start !important">
                    <CheckBox defaultChecked /> <Text>Delete file from your device</Text>
                </Center>
            </Confirm>
        </>
    );
}

export default ConfirmDeleteSelected;