import Menu from '@mui/material/Menu';

import useDropDownMenu from '../../hooks/useDropDownMenu';

export default function DropDownMenu({ InvokeComponent, children, horizontalDirection, closeOnClick = true }) {
    const { handleClose, handleClick, open } = useDropDownMenu();

    return (
        <>
            <InvokeComponent onClick={handleClick} />
            {open && (
                <Menu
                    open
                    anchorReference='anchorPosition'
                    onClose={handleClose}
                    transformOrigin={{ horizontal: horizontalDirection || 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    {...(closeOnClick && { onClick: handleClose })}
                    anchorPosition={{ top: open.y, left: open.x }}
                >
                    {children}
                </Menu>
            )}

        </>
    );
}

