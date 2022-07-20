import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';

function Animate({ type = "slide", ...rest }) {

    const Component = type === 'fade' ? Fade : (type === 'grow' ? Grow : Slide);

    return <Component unmountOnExit {...rest} />
}

export default Animate;