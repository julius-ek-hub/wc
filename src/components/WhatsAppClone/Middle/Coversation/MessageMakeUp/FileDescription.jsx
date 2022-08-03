import MicIcon from '@mui/icons-material/Mic';
import Camera from '@mui/icons-material/CameraAlt';
import useMessage from '../../../../../hooks/useMessage';

import Center from "../../../../styled/Center";

function FileDescription({ message }) {
    const { deleted } = useMessage();
    const file = message.file;
    if (!file || message.securityMessage || deleted(message)) return null;
    const type = file.type;
    return (
        <Center justifyContent="flex-start !important">
            {type === 'voice' && <MicIcon fontSize='small' />}
            {type === 'image' && <Camera fontSize='small' sx={{ mr: 0.2 }} />}
            {file.type.toUpperCase()}
        </Center>
    );
}

export default FileDescription;