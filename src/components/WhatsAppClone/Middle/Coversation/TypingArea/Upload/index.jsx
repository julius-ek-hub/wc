import { useState } from 'react';

import {
    colors,
    IconButton,
    Tooltip,
    Stack,
    Zoom,
    Slide,
    ClickAwayListener,
} from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import CollectionsIcon from '@mui/icons-material/Collections';

import ButtonWithIcon from '../ButtonWithIcon';
import Preview from './Preview';
import useFiles from '../../../../../../hooks/useFiles';


export default function Upload() {
    const [open, setOpen] = useState(false);
    const { chooseFileFromStorage } = useFiles();
    const [choosenFiles, setChooseFiles] = useState([]);

    const toggleVisibility = () => {
        setOpen(!open);
    }

    const handleClickAway = e => {
        if (e.path.some(p => (p instanceof HTMLButtonElement) && p.classList.contains('upload-btn'))) return;
        setOpen(false)
    }

    const choosePictureOrVideo = async () => {
        const files = await chooseFileFromStorage({ accept: 'image/jpg,image/jpeg,image/png,video/mp4', muliple: true });
        setChooseFiles(files);
    }

    const UploadTypeButton = ({ title, Icon, color, timeout, ...rest }) => (
        <Zoom in={open} timeout={timeout}>
            <Tooltip title={title} placement='right'>
                <IconButton sx={{
                    bgcolor: color,
                    p: 1.4,
                    '&:hover': {
                        bgcolor: color
                    }
                }} {...rest}>
                    <Icon sx={{ color: 'background.paper', fontSize: 30 }} />
                </IconButton>
            </Tooltip>
        </Zoom>
    );


    return (
        <>
            <ButtonWithIcon
                className="upload-btn"
                Icon={AttachFileIcon}
                onClick={toggleVisibility}
                isx={{ transform: 'rotate(45deg)' }}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Slide in={open} direction="up" timeout={300} unmountOnExit>
                        <Stack
                            position="absolute"
                            justifyContent="flex-end"
                            bottom={60}
                            rowGap={2}
                            zIndex={1}
                            left={0}>
                            <UploadTypeButton
                                title="Contact"
                                Icon={PersonIcon}
                                timeout={900}
                                color={colors.blue.A100} />
                            <UploadTypeButton
                                title="Document"
                                Icon={DescriptionIcon}
                                timeout={700}
                                color={colors.blue.A400} />
                            <UploadTypeButton
                                title="Camera"
                                Icon={PhotoCameraIcon}
                                timeout={700}
                                color={colors.red.A400} />
                            <UploadTypeButton
                                title="Sticker"
                                Icon={StickyNote2Icon}
                                timeout={500}
                                color={colors.blue.A700} />
                            <UploadTypeButton
                                title="Photos &amp; Videos"
                                Icon={CollectionsIcon}
                                onClick={choosePictureOrVideo}
                                timeout={500}
                                color={colors.purple.A700} />
                        </Stack>
                    </Slide>
                </ClickAwayListener>
            </ButtonWithIcon>
            {choosenFiles.length > 0 && (
                <Preview
                    files={choosenFiles}
                    onDone={() => setChooseFiles([])}
                />
            )}
        </>
    )
}
