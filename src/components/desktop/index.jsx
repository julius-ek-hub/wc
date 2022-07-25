import { memo } from 'react';

import MainView from './views/Main';
import Left from './Left';
import Middle from './Middle';
import Right from './Right';
import NewUser from '../common/NewUser';

import useSettings from '../../hooks/useSettings';

function WhatsAppDesktop() {
    const { _id } = useSettings();

    return (
        <MainView>
            {_id ? (
                <>
                    <Left />
                    <Middle />
                    <Right />
                </>
            ) : <NewUser />}
        </MainView>
    )
}

export default memo(WhatsAppDesktop);
