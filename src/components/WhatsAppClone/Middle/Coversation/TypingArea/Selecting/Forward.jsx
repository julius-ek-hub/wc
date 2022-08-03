import ReplyIcon from '@mui/icons-material/Reply';

import SelectContacts from "../../../../SelectContacts";
import ButtonWithIcon from '../ButtonWithIcon';

import useMessages from '../../../../../../hooks/useMessages';
import { useState } from 'react';

function Forward() {
    const { selected } = useMessages();
    const [open, setOpen] = useState(false);

    return (
        <>
            <ButtonWithIcon
                onClick={() => setOpen(true)}
                Icon={ReplyIcon}
                isx={{
                    transform: 'rotateY(180deg)'
                }} />
            <SelectContacts
                title={`Forward message${selected.length > 1 ? 's' : ''} too..`}
                open={open}
                onCanceled={() => setOpen(false)}
                max={5}
                onSelected={s => {
                    console.log(s);
                    setOpen(false)
                }}
            />
        </>
    );
}

export default Forward;