import { StyledStickyDate } from '../../../../styled/desktop/MessageMakup';
import Text from '../../../../common/Text';

function StickyDate({ previous, now }) {
    if (previous) {
        let p = new Date(previous.receipt.sent).toLocaleDateString();
        let n = new Date(now.receipt.sent).toLocaleDateString();

        if (p === n) return null
    }

    const _thisDate = new Date(now.receipt.sent).getDate();
    const today = new Date().getDate();
    let result = new Date(now.receipt.sent).toDateString();

    let diff = today - _thisDate;
    result = diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : result;

    return (
        <StyledStickyDate>
            <Text>{result}</Text>
        </StyledStickyDate>
    );
}

export default StickyDate;