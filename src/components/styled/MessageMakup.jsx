import Box from "@mui/material/Box";

import { styled, lighten, darken, alpha } from "@mui/material/styles";

export const MessageMakeUp = styled(Box)(({ theme: { palette }, incoming, sameGroup, selected, selecting }) => {
    const bgOut = palette.messageBg.outgoing;
    const bgIn = palette.messageBg.incoming;

    const scrolled = incoming ? {
        backgroundColor: darken(bgIn, 0.4)
    } : {
        backgroundColor: darken(bgOut, 0.4)
    }

    return {
        display: 'flex',
        position: 'relative',
        marginTop: sameGroup ? '5px' : '25px',
        transition: '200ms all',
        ...(incoming ? {
            paddingLeft: '10%'
        } : {
            paddingRight: '10%',
            justifyContent: 'flex-end'
        }),
        ...(selected && {
            backgroundColor: alpha(palette.primary.main, 0.2),
        }),
        '& .extra-actions': {
            transform: 'scale(0)',
            transition: '200ms transform'
        },
        '&:hover': {
            ...(selecting && {
                backgroundColor: alpha(palette.primary.main, 0.2),
                cursor: 'pointer'
            }),
            '& .extra-actions': {
                transform: 'scale(1)'
            }
        },
        '&>div.message': {
            maxWidth: '70%',
            minWidth: '150px',
            padding: '6px 7px 8px 9px',
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
            '& .reciept': {
                fontSize: "small",
                margin: "0px 0 -5px 4px",
                justifyContent: "flex-end",
                color: palette.text.primary,
                display: 'flex',
                alignItems: 'center'
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

            '&:is(.scrolled div)': {
                ...scrolled,
                '&:after': {
                    borderRight: `10px solid ${scrolled.backgroundColor}`,
                },
                '&:before': {
                    borderLeft: `10px solid ${scrolled.backgroundColor}`,
                }
            },

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