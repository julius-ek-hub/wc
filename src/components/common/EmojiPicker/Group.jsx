import { useState, useEffect, memo } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import IconButton from '../../common/IconButton';
import Text from '../Text';
import Animate from '../Animate';
import LoadingEmojis from '../LoadingIndicators/LoadingEmojis';

import { capitalizeFirstLetter, sleep } from '../../../utils';
import useExtraResources from '../../../hooks/useExtraResources';


function Group({ group, onPicked }) {

    const { emojis: { emojis } } = useExtraResources();
    const [_group, setGroup] = useState(group);
    const [allEmojis, setAllEmojis] = useState(null);

    const groupName = group.split('-').map(capitalizeFirstLetter).join(' & ');

    useEffect(() => {
        setGroup(group);
        doSetEmoji();
    }, [group, doSetEmoji]);

    const doSetEmoji = async () => {
        await sleep(1);
        setAllEmojis(emojis.filter(emoji => emoji.group === group).map(emoji => (
            <IconButton
                onClick={onPicked?.bind(null, emoji)}
                Icon={() => emoji.character} key={emoji.slug} />
        )))
    }

    return (
        <Animate
            type='fade'
            in={group === _group}>
            <Box>
                <Box m={2}>
                    <Text mb={1}>{groupName}</Text>
                    <Divider />
                </Box>
                <Box display="flex" flexWrap='wrap'>
                    {allEmojis}
                    <LoadingEmojis loading={allEmojis === null} />
                </Box>
            </Box>
        </Animate>

    )

}

export default memo(Group, (prev, next) => next.group === prev.group);