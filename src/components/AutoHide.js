import React, { useEffect, useRef } from 'react';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';

export default function AutoHide({
  children,
  open,
  onClose,
  onExit,
  transitionTime,
  visibleTime = null,
  
}) {

  const timerAutoHide = useRef();

  useEffect(() => {

    const setTimer = () => {
      if (!onClose || visibleTime == null) {
        return;
      }
      timerAutoHide.current = setTimeout(onClose, visibleTime);
    }

    if (open && visibleTime) {
      setTimer();
    }

    return () => {
        clearTimeout(timerAutoHide.current);
    };
  }, [open, visibleTime, onClose]);

  return (
    <Collapse in={open} timeout={transitionTime} onExited = {onExit} >
      {children}
    </Collapse>
  )
}

AutoHide.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onExit: PropTypes.func,
  transitionTime: PropTypes.number,
  visibleTime: PropTypes.number,
}

AutoHide.defaultProps = {
}