import { useState } from 'react';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Close from '@mui/icons-material/Close';

import Sub from '../../../views/Sub';
import Text from '../../../../Text';
import ContactMakeUp from '../../../../ContactMakeUp';
import MenuItem from '../../../../MenuItem';
import IconButton from '../../../../IconButton';
import SelectContacts from '../../../SelectContacts';

import useSettings from '../../../../../hooks/useSettings';

function Blocked() {
    const { open, updateSettings, privacy } = useSettings();
    const [exceptionsOpen, setExceptionsOpen] = useState(false);


    const handleExceptionChange = (_id) => {
        setExceptionsOpen(false)
    }

    return (
        <Sub
            open={open === 'privacy.blocked'}
            animationDirection="right"
            title="Blocked contacts"
            onClose={() => updateSettings('open', 'privacy')}
        >
            <Sub.Container p={0}>
                <MenuItem
                    label="Add blocked contact"
                    onClick={() => setExceptionsOpen(true)}
                    isx={{ fontSize: '1.3rem' }}
                    sx={{ p: 2.3 }}
                    Icon={PersonAddIcon} />
                <Divider sx={{ mt: '0 !important' }} />
                <List>

                    <ContactMakeUp info={{ telephone: '7883437478734' }} endComponent={
                        <IconButton Icon={Close} sx={{
                            position: 'absolute',
                            right: 10,
                            top: 15
                        }} />
                    } />
                    <ContactMakeUp info={{ telephone: '7883437478734' }} endComponent={
                        <IconButton Icon={Close} sx={{
                            position: 'absolute',
                            right: 10,
                            top: 15
                        }} />
                    } />
                    <ContactMakeUp info={{ telephone: '7883437478734' }} endComponent={
                        <IconButton Icon={Close} sx={{
                            position: 'absolute',
                            right: 10,
                            top: 15
                        }} />
                    } />
                </List>
            </Sub.Container>
            <Text ellipsis={false} fontSize="small" alpha={0.5} p={4}>Blocked contacts will no longer be able to call you or send you messages</Text>
            <SelectContacts
                open={exceptionsOpen}
                multiple={false}
                title="Add blocked contact"
                selectedName="excluded"
                onSelected={handleExceptionChange}
                onCanceled={() => setExceptionsOpen(false)} />
        </Sub>
    );
}

export default Blocked;