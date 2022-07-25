import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Sub from "../../../views/Sub";
import Text from "../../../../common/Text";

import useSettings from "../../../../../hooks/useSettings";

const Label = ({ label, value }) => (
    <FormControlLabel
        control={<Radio />}
        label={<Text>{label}</Text>}
        sx={{ mt: 2 }}
        value={value} />
)

function ChoosePeople({ id, title, description, children }) {
    const { open, updateSettings } = useSettings();

    return (
        <Sub
            animationDirection="right"
            open={open === 'privacy.' + id}
            title={title}
            onClose={() => updateSettings('open', 'privacy')}
        >
            <Sub.Container>
                <Text ellipsis={false} fontSize="small">
                    {description}
                </Text>
                <RadioGroup defaultValue="everyone">
                    <Label label="Everyone" value="everyone" />
                    <Label label="My contacts" value="contacts" />
                    <Label label="My contacts except" value="everyoneExcept" />
                    <Label label="Nobody" value="nobody" />
                </RadioGroup>
                {children}
            </Sub.Container>
        </Sub>
    );
}

export default ChoosePeople;