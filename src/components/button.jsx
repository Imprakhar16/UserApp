import React from "react";

const CommonButton = ({
  title,
  onClick,
  className,
  type,
  style,
  dataAction,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={style}
      data-bs-dismiss={dataAction}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default CommonButton;
