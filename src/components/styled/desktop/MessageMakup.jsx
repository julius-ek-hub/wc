import Box from "@mui/material/Box";

import { styled, lighten, darken } from "@mui/material/styles";

export const MessageMakeUp = styled(Box)(({ theme: { palette }, incoming, sameGroup }) => {
    const bgOut = palette.messageBg.outgoing;
    const bgIn = palette.messageBg.incoming;
    return {
        display: 'flex',
        marginTop: sameGroup ? '5px' : '20px',
        ...(incoming ? {
            paddingLeft: '10%'
        } : {
            paddingRight: '10%',
            justifyContent: 'flex-end'
        }),
        '&>div.message': {
            maxWidth: '70%',
            padding: '4px',
            borderRadius: '10px',
            position: 'relative',
            boxShadow: '0 1px .5px rgba(11,20,26,.13)',
            '& .drop-menu': {
                position: "absolute",
                width: 50,
                height: 50,
                top: 0,
                right: 0,
                '&>div': {
                    position: "relative",
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    '&>button': {
                        position: 'absolute',
                        right: "-30px",
                        transition: '200ms right',
                    }
                }
            },
            '&:hover .drop-menu>div>button': {
                right: 0,
            },
            '& .date': {
                fontSize: "small",
                margin: "0px 0 -5px 4px",
                textAlign: "right",
                color: palette.text.primary
            },
            ...(incoming ? {
                borderTopLeftRadius: 0,
                backgroundColor: bgIn,
                ...(!sameGroup && {
                    '&:before': {
                        position: 'absolute',
                        content: '""',
                        height: 0,
                        width: 0,
                        border: '10px solid transparent',
                        borderLeft: `10px solid ${bgIn}`,
                        top: '-10px',
                        transform: 'rotate(-45deg)',
                        left: '-10px',
                    }
                })
            } : {
                borderTopRightRadius: 0,
                backgroundColor: bgOut,
                ...(!sameGroup && {
                    '&:after': {
                        position: 'absolute',
                        content: '""',
                        height: 0,
                        width: 0,
                        border: '10px solid transparent',
                        borderRight: `10px solid ${bgOut}`,
                        top: '-10px',
                        transform: 'rotate(45deg)',
                        right: '-10px'
                    }
                })
            }),

        }
    }
})

export const StyledStickyDate = styled(Box)(({ theme: { palette } }) => ({
    position: 'sticky',
    zIndex: 10,
    padding: '15px 0 15px 0',
    top: '-10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&>:first-of-type': {
        backgroundColor: palette.background.paper,
        boxShadow: '0 1px .5px rgba(11,20,26,.13)',
        padding: '5px',
        borderRadius: '10px',
        paddingLeft: '18px',
        paddingRight: '18px'
    }
}));

export const Reply = styled(Box)(({ theme: { palette } }) => ({
    borderLeft: `4px solid #06cf9c`,
    borderRadius: 4,
    padding: '4px 6px 6px 6px',
    marginBottom: 4,
    cursor: 'pointer',
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: lighten(palette.text.primary, 0.3),
    '& .sender': {
        color: '#06cf9c',
        fontWeight: 'bolder'
    },
    '&>:last-of-type': {
        color: palette.mode === 'dark' ? darken(palette.text.primary, 0.3) : lighten(palette.text.primary, 0.3),
    }
}));