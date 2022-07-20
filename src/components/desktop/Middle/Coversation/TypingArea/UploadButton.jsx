import AttachFileIcon from '@mui/icons-material/AttachFile';

import ButtonWithIcon from './ButtonWithIcon';


export default function UploadButton() {

  return <ButtonWithIcon Icon={AttachFileIcon} isx={{ transform: 'rotate(45deg)' }} />
}
