import Main from './Main';
import LastSeen from './LastSeen';
import ProfilePhoto from './ProfilePhoto';
import About from './About';
import DisappearingMessages from './DisapearingMessages';
import Groups from './Groups';
import Blocked from './Blocked';

function Privacy() {

    return (
        <>
            <Main />
            <LastSeen />
            <ProfilePhoto />
            <About />
            <DisappearingMessages />
            <Groups />
            <Blocked />
        </>
    );
}

export default Privacy;