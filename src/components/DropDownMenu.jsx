import Menu from '@mui/material/Menu';

import useDropDownMenu from '../hooks/useDropDownMenu';

export default function DropDownMenu({ open: o = true, InvokeComponent, children, horizontalDirection, closeOnClick = true, ...rest }) {
    const { handleClose, handleClick, open } = useDropDownMenu();

    return (
        <>
            <InvokeComponent onClick={handleClick} />
            {open && (
                <Menu
                    open={open && o}
                    anchorReference='anchorPosition'
                    onClose={handleClose}
                    transformOrigin={{ horizontal: horizontalDirection || 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    {...(closeOnClick && { onClick: handleClose })}
                    anchorPosition={{ top: open.y, left: open.x }}
                    {...rest}
                >
                    {children}
                </Menu>
            )}

        </>
    );
}

