import React from "react";

/**
 * Component wrapped in this will be hidden when showControls is true.
 */
const Hideable: React.FC<{ showControls: boolean; divProps?: Object }> = ({
  children,
  showControls,
  divProps,
}) => {
  return (
    <div {...divProps} style={{ opacity: showControls ? "1" : "0" }}>
      {children}
    </div>
  );
};

export default Hideable;
