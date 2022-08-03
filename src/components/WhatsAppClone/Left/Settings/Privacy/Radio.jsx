import FormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Text from '../../../../Text';

const Radio = MuiRadio;

Radio.Group = props => <RadioGroup {...props} />
Radio.Label = ({ label, value, ...rest }) => (
    <FormControlLabel
        control={<MuiRadio />}
        label={<Text>{label}</Text>}
        sx={{ mt: 2 }}
        value={value}
        {...rest} />
)

export default Radio;