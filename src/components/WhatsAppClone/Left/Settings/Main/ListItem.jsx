import MenuItem from '../../../../MenuItem';

import useSettings from '../../../../../hooks/useSettings';

import { capitalizeFirstLetter } from '../../../../../utils';

function ListItem({ to, Icon, onClick, showdivider = true }) {
    const { updateSettings } = useSettings();

    return (
        <MenuItem
            onClick={onClick ? onClick : () => updateSettings('open', to)}
            sx={{ p: 2 }}
            showdivider={showdivider}
            dividerOffsetLeft={68}
            Icon={Icon}
            isx={{ fontSize: 30, mr: 2 }}
            label={to.split('-').map(capitalizeFirstLetter).join(' ')} />
    );
}

export default ListItem;