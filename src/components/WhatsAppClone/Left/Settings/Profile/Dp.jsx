import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import Camera from '@mui/icons-material/CameraAlt'

import Center from '../../../../styled/Center';

import Text from '../../../../Text';
import DropDownMenu from '../../../../DropDownMenu';
import MenuItem from '../../../../MenuItem';
import PreviewImage from '../../../../PreviewImage';

import useSettings from '../../../../../hooks/useSettings';
import useFiles from '../../../../../hooks/useFiles';

import { blobURL } from '../../../../../utils';

function Dp() {
    const { bio, userName, open, updateSettings, dp } = useSettings();
    const { upload, chooseFileFromStorage } = useFiles();

    const uploadDp = async () => {
        const files = await chooseFileFromStorage({ accept: 'image/png,image/jpeg,image/jpg' });
        const _dp = files[0];

        const url = blobURL(new Blob(files, { type: _dp.type }));

        updateSettings('dp', url);
    }

    const removeDp = () => {
        updateSettings('dp', '');
    }

    return (
        <Center p={3} bgcolor="primaryHeaderBg">
            <Center
                sx={{
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                    position: 'relative',
                    '&:hover >div:last-of-type': {
                        opacity: 1
                    },
                }}>
                <Avatar sx={{ height: 200, width: 200 }} {...(dp && { src: dp })} />
                <DropDownMenu
                    horizontalDirection="left"
                    closeOnClick={false}
                    InvokeComponent={props => (
                        <Center sx={{
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            bgcolor: 'rgba(0,0,0,0.8)',
                            borderRadius: '50%',
                            opacity: 0,
                            transition: '300ms opacity',
                            cursor: 'pointer'
                        }} {...props}>
                            <Text ellipsis={false} p={2} textAlign="center" component="div" color="primary.main">
                                <Box><Camera /></Box>
                                CHANGE PROFILE PHOTO
                            </Text>
                        </Center>
                    )}>
                    {dp && <PreviewImage
                        src={dp}
                        InvokeComponent={(props) => (
                            <MenuItem label="View Photo" {...props} />
                        )} />}
                    <MenuItem label="Take Photo" disabled />
                    <MenuItem label="Upload photo" onClick={uploadDp} />
                    {dp && <MenuItem label="Remove photo" onClick={removeDp} />}
                </DropDownMenu>
            </Center>
        </Center>
    );
}

export default Dp;