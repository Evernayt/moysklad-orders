import React, { forwardRef } from 'react';
import './Tooltip.css';

const Tooltip = forwardRef(({ text, isShowing, props }, ref) => {
  return (
    <div
      className={isShowing ? 'tooltip tooltip-showing' : 'tooltip'}
      ref={ref}
      {...props}
    >
      {text}
    </div>
  );
});

export default Tooltip;
