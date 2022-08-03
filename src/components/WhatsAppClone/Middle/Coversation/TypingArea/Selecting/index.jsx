import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

import DownloadIcon from '@mui/icons-material/Download';

import ButtonWithIcon from '../ButtonWithIcon';
import Animate from '../../../../../Animate';
import Forward from './Forward';
import ConfirmDeleteSelected from './ConfirmDeleteSelected';

import useMessages from '../../../../../../hooks/useMessages';
import Text from '../../../../../Text';
import Center from '../../../../../styled/Center';
import useMessage from '../../../../../../hooks/useMessage';

function Selecting() {

    const { selecting, selected, resetSelect } = useMessages();
    const { startMessage } = useMessage();

    return (
        <Animate in={selecting} direction="up" timeout={300}>
            <Center bgcolor='primaryHeaderBg' padding='10px 16px' justifyContent="space-between !important">
                <Center>
                    <ButtonWithIcon Icon={CloseIcon} onClick={() => resetSelect()} />
                    <Text>{selected.length} slected</Text>
                </Center>
                <Center gap={0.5}>
                    <ButtonWithIcon Icon={StarIcon} onClick={() => {
                        startMessage(selected);
                        resetSelect();
                    }} />
                    <ConfirmDeleteSelected />
                    <Forward />
                    <ButtonWithIcon Icon={DownloadIcon} />
                </Center>
            </Center>
        </Animate>
    );
}

export default Selecting;