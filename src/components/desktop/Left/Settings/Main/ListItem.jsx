import MenuItem from '../../../../common/MenuItem';

import useSettings from '../../../../../hooks/useSettings';

import { capitalizeFirstLetter } from '../../../../../utils';

function ListItem({ to, Icon, onClick, showDivider = true }) {
    const { updateSettings } = useSettings();

    return (
        <MenuItem
            onClick={onClick ? onClick : () => updateSettings('open', to)}
            sx={{ p: 2 }}
            showDivider={showDivider}
            dividerOffsetLeft={68}
            Icon={Icon}
            isx={{ fontSize: 30, mr: 2 }}
            label={to.split('-').map(capitalizeFirstLetter).join(' ')} />
    );
}

export default ListItem;