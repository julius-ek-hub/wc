import { memo, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Center from "../../styled/common/Center";
import Text from "../Text";
// import CircularProgress from "../../common/LoadingIndicators/CircularProgress";

import useDimension from "../../../hooks/useDimension";
import useSettings from "../../../hooks/useSettings";
import useConnection from "../../../hooks/useConnection";
// import useChats from "../../../hooks/useChats";
import useLocalStorage from "../../../hooks/useLocalStorage";

function NewUser() {
    const [info, setInfo] = useState({ email: '', telephone: '' });
    const [error, setError] = useState({ email: null, telephone: null });
    const [touched, setTouched] = useState({ email: false, telephone: false });

    const { initializeUserInfo } = useSettings();
    const conn = useConnection();
    const { lg, md } = useDimension();
    const { set } = useLocalStorage();

    const handleChange = (key) => {
        return ({ target }) => {
            setInfo({
                ...info,
                [key]: target.value
            });

            if (touched[key]) validateInput(key);
        }
    }

    const handleBlur = (key) => {
        return () => {
            validateInput(key);
            setTouched({
                ...info,
                [key]: true
            })
        }
    }

    const validateInput = (key = "telephone") => {

        let _error = error[key];
        let value = info[key];

        if (key === 'email') {
            if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
                _error = 'Invalid email address';
            else
                _error = null;
        } else {
            if (value.length < 4 ||
                value.length > 18 ||
                !value.match(/^(\+)?[0-9]*$/))
                _error = 'Invalid telephone number';
            else
                _error = null;
        }
        setError({
            ...error,
            [key]: _error
        });

        return _error;
    }

    const handleSubmit = async () => {
        const errTel = validateInput('telephone');
        const errEmail = validateInput('email');
        if (errEmail || errTel) return;

        const socket = await conn.use('/auth');
        socket.emit('new-account', info, response => {
            initializeUserInfo(response.account);
            set('wc-jwt-user', response.token);
            socket.disconnect();
        });
    }


    return (
        <Center width="100%" >
            <Stack rowGap={1} width={lg ? '500px' : (md ? '60%' : '80%')}>
                {/* <CircularProgress loading={busy} message={busyMessage} /> */}
                <Text variant="h4" mb={1}>Sign In</Text>
                <TextField
                    label="Telephone"
                    value={info.telephone}
                    onChange={handleChange('telephone')}
                    placeholder="Telephone number"
                    error={error.telephone !== null}
                    onBlur={handleBlur('telephone')}
                    helperText={error.telephone ? error.telephone : "This...."}
                />
                <TextField
                    label="Email"
                    value={info.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={error.email !== null}
                    placeholder="Optional email address"
                    helperText={error.email ? error.email : "This...."}
                />
                <Box>
                    <Button variant="contained" onClick={handleSubmit}>Login</Button>
                </Box>
            </Stack>
        </Center>
    );
}

export default memo(NewUser);