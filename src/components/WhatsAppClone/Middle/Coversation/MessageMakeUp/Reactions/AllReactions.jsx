import { useState } from 'react';

import Divider from '@mui/material/Divider';
import ContactMakeUp from '../../../../../ContactMakeUp';
import Animate from '../../../../../Animate';

import useMessage from '../../../../../../hooks/useMessage';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Text from '../../../../../Text';
import useSettings from '../../../../../../hooks/useSettings';
import useChats from '../../../../../../hooks/useChats';


function AllReactions() {

    const { message, addReaction } = useMessage();
    const [tab, setTab] = useState('all');
    const { _id, simpleInfo } = useSettings();
    const { chatInfoFromUserId } = useChats();

    const reactions = message.reactions;

    const onChange = (e, v) => {
        setTab(v)
    }

    return (
        <Box width={400}>
            <TabContext value={tab}>
                <TabList onChange={onChange} sx={{
                    justifyContent: 'center'
                }}>
                    {[{ character: 'All', slug: 'all' }, ...reactions].map(({ character, slug }) => (
                        <Tab label={character} value={slug} key={slug} sx={{
                            fontSize: 20,
                        }} />
                    ))}
                </TabList>
                <Divider />
            </TabContext>
            <Box height={200} className="custom-scrollbar" overflow="auto">
                {reactions.map(reaction => (
                    <Animate key={reaction.slug} in={tab === reaction.slug || tab === 'all'}>
                        <Box>
                            {reaction.reactors.map(reactor => (
                                <ContactMakeUp
                                    key={reactor._id}
                                    {...(reactor._id === _id) && {
                                        onClick: () => addReaction({
                                            slug: reaction.slug,
                                            character: reaction.character
                                        })
                                    }}
                                    info={reactor._id === _id ? simpleInfo : chatInfoFromUserId(reactor._id).partnerInfo}
                                    endComponent={<Text fontSize="large" mr={1}>{reaction.character}</Text>} />
                            ))}
                        </Box>
                    </Animate>
                ))}
            </Box>
        </Box>
    );
}

export default AllReactions;