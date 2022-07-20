import MenuItem from '../../../../common/MenuItem';

import useSettings from '../../../../../hooks/useSettings';

import { capitalizeFirstLetter } from '../../../../../utils';

function ListItem({ to, Icon }) {
    const { updateStore } = useSettings();

    return (
        <MenuItem
            onClick={() => updateStore('open', to)}
            sx={{ p: 2 }}
            Icon={Icon}
            isx={{ fontSize: 30, mr: 2 }}
            label={to.split('-').map(capitalizeFirstLetter).join(' ')} />
    );
}

export default ListItem;