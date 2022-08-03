import { useState } from "react";

import CloseIcon from '@mui/icons-material/Close';

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

import Center from "./styled/Center";
import IconButton from "./IconButton";
import Header from "./styled/Header";
import Text from "./Text";

function PreviewImage({ src, InvokeComponent, onClose }) {
    const [open, setOpen] = useState(false);

    const close = () => {
        setOpen(false);
        onClose?.call();
    }

    return (
        <>
            <InvokeComponent onClick={() => setOpen(true)} />
            <Backdrop unmountOnExit open={open} sx={{ zIndex: 100, flexDirection: 'column' }}>
                <Header sx={{
                    p: 1,
                    width: '100%',
                    justifyContent: 'space-between',
                }}>
                    <Text ml={2}>Preview</Text>
                    <IconButton
                        Icon={CloseIcon}
                        onClick={close}
                        sx={{ mr: 1 }}
                        isx={{ fontSize: '2rem' }} />
                </Header>
                <Center flexGrow={1} bgcolor="background.paper" width="100%" overflow="hidden">
                    <Box
                        component="img"
                        src={src}
                        sx={{ height: '100%' }}
                    />
                </Center>
            </Backdrop>
        </>
    );
}

export default PreviewImage;