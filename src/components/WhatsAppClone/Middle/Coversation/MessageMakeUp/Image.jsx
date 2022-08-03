import Center from "../../../../styled/Center";
import Receipt from "./Receipt";
import PreviewImage from "../../../../PreviewImage";

import useMessage from "../../../../../hooks/useMessage";

function Image() {
    const { message, } = useMessage();
    let file = message.file;

    if (file?.type !== 'image') return null;


    return (
        <PreviewImage src={file.url} InvokeComponent={props => (
            <Center minWidth={300} maxHeight={400} pr={1} flexDirection="column" overflow="hidden">
                <Center
                    component="img"
                    src={file.url}
                    borderRadius="10px"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    {...props}
                />
            </Center>
        )} />
    );
}

export default Image;