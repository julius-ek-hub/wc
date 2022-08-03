import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Sub from "../../../views/Sub";
import Text from "../../../../Text";
import SelectContacts from '../../../SelectContacts';

import useSettings from "../../../../../hooks/useSettings";
import { useState } from 'react';

const Label = ({ label, value, ...rest }) => (
    <FormControlLabel
        control={<Radio />}
        label={<Text>{label}</Text>}
        sx={{ mt: 2 }}
        value={value} {...rest} />
)

function ChoosePeople({ id, title, description, children }) {
    const { open, updateSettings, privacy } = useSettings();
    const [exceptionsOpen, setExceptionsOpen] = useState(false);

    const changePrivacy = (value) => {
        updateSettings('privacy', {
            ...privacy,
            [id]: {
                type: value
            }
        })
    }

    const handleChange = (e, value) => {
        if (value === 'contacts-except') return;
        changePrivacy(value);
    }


    const handleExceptionChange = (values) => {
        if (values.length > 0)
            updateSettings('privacy', {
                ...privacy,
                [id]: {
                    type: 'contacts-except',
                    exceptions: values
                }
            })
        else
            changePrivacy('everyone');

        setExceptionsOpen(false);
    }

    return (
        <>
            <Sub
                animationDirection="right"
                open={open === 'privacy.' + id}
                title={title}
                onClose={() => updateSettings('open', 'privacy')}
            >
                <Sub.Container p={3}>
                    <Text ellipsis={false} fontSize="small">
                        {description}
                    </Text>
                    <RadioGroup value={privacy[id]?.type || 'everyone'} onChange={handleChange}>
                        <Label label="Everyone" value="everyone" />
                        <Label label="My contacts" value="contacts" />
                        <Label label="My contacts except" value="contacts-except" onClick={() => setExceptionsOpen(true)} />
                        <Label label="Nobody" value="no-one" />
                    </RadioGroup>
                    {children}
                </Sub.Container>
            </Sub>
            <SelectContacts
                open={exceptionsOpen}
                title="Hide last seen from all contacts except..."
                selectedName="excluded"
                defaultChecked={privacy[id]?.exceptions}
                onSelected={handleExceptionChange}
                onCanceled={() => setExceptionsOpen(false)} />
        </>
    );
}

export default ChoosePeople;