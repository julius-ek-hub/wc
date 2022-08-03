import { StyledStickyDate } from '../../../../styled/MessageMakup';
import Text from '../../../../Text';
import useMessage from '../../../../../hooks/useMessage';

import { date } from '../../../../../utils';

function StickyDate() {
    const { previous, message } = useMessage();

    if (previous) {
        let p = new Date(previous.receipt.sent).toLocaleDateString();
        let n = new Date(message.receipt.sent).toLocaleDateString();

        if (p === n) return null;
    };

    return (
        <StyledStickyDate>
            <Text>{date(message.receipt.sent).sticky}</Text>
        </StyledStickyDate>
    );
}

export default StickyDate;