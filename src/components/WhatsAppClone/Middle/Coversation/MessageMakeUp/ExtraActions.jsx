import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import ReactionsGenerator from './ReactionsGenerator';

import IconButton from '../../../../IconButton';
import Center from '../../../../styled/Center';

import useMessage from '../../../../../hooks/useMessage';
import useMessages from '../../../../../hooks/useMessages';

function ExtraActions() {

    const { message, iSent, deleted } = useMessage();
    const { selecting } = useMessages();

    if (selecting || message._new || deleted()) return null;

    return (
        <Center className="extra-actions">
            <ReactionsGenerator
                InvokeComponent={props => (
                    <IconButton
                        sx={{
                            bgcolor: 'rgba(0,0,0,0.2)',
                            p: 0.4,
                            ...(iSent ? { mr: 0.5 } : { ml: 0.5 }),
                        }}
                        Icon={EmojiEmotionsIcon}
                        isx={{ color: 'secondaryHeaderText', fontSize: '20px' }}
                        {...props} />
                )}
            />
        </Center>
    );
}

export default ExtraActions;