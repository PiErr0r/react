import React, { useEffect, useState } from "react";

// MUI
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

const ContextMenu = (evt, onClose, children) => {
	if (!evt) {
		return null;
	}
	evt.preventDefault();
	evt.stopPropagation();
	return (
    <Menu
      open={true}
      onClose={(e) => onClose(e)}
      anchorEl={evt.target}
      onClick={(e) => onClose(e)}
    >
      { children.map((c,i) => Object.assign({}, c, { key: i })) }
    </Menu>
  );
}

function useContextMenu(children) {
	const [CMenu, setCMenu] = useState(null);

	const setOpen = (evt, onClose) => {
		if (typeof onClose !== 'function') {
			onClose = () => {};
		}
		if (evt) {
			setCMenu(ContextMenu(evt, (e) => setCMenu(null) || onClose(e), children));
		} else {
			setCMenu(null);
		}
	}

	return { ContextMenu: () => (CMenu ?? null), setOpen }
}

export { useContextMenu }