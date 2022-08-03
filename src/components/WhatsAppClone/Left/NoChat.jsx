import Center from "../../styled/Center";
import Text from "../../Text";

function NoChat({ children }) {
    return (
        <Center flexGrow={1} p={4}>
            <Text alpha={0.5} ellipsis={false} textAlign="center">
                {children}
            </Text>
        </Center>
    )
}

export default NoChat;