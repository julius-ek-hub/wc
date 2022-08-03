import Text from "../../../../Text";
import ChoosePeople from "./ChoosePeople";

function Groups() {
    return (
        <ChoosePeople
            id="groups"
            title="Groups"
            description="Who can add me to groups"
        >
            <Text mt={2} ellipsis={false}>
                Admins who can't add you to a group will have the option of inviting you privately instead
            </Text>
        </ChoosePeople>
    );
}

export default Groups;