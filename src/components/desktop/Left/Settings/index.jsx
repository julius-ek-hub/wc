import Profile from './Profile';
import Main from './Main';
import Notifications from './Notifications';
import Privacy from './Privacy';
import Security from './Security';
import ChatWallPaper from './ChatWallPaper';
import AccountInfo from './AccountInfo';
import Help from './Help';

function Settings() {
    return (
        <>
            <Main />
            <Profile />
            <Notifications />
            <Privacy />
            <Security />
            <ChatWallPaper />
            <AccountInfo />
            <Help />
        </>
    );
}

export default Settings;