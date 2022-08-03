import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckBox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';

import Text from './Text';

const CheckBox = MuiCheckBox;

CheckBox.Group = props => <RadioGroup {...props} />
CheckBox.Label = ({ label, value, ...rest }) => (
    <FormControlLabel
        control={<MuiCheckBox />}
        label={<Text>{label}</Text>}
        sx={{ mt: 2 }}
        value={value}
        {...rest} />
)

export default CheckBox;