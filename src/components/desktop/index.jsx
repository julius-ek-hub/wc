import { memo } from 'react';

import View from './View';
import Left from './Left';
import Middle from './Middle';
import Right from './Right';
import NewUser from '../common/NewUser';

import useSettings from '../../hooks/useSettings';

function WhatsAppDesktop() {
    const { settings } = useSettings();

    return (
        <View>
            {settings ? (
                <>
                    <Left />
                    <Middle />
                    <Right />
                </>
            ) : <NewUser />}
        </View>
    )
}

export default memo(WhatsAppDesktop);
