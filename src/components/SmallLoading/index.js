import React, { memo } from 'react';
import ReactLoading from 'react-loading';

const SmallLoading = ({ type, width = 64, height = 64 }) => {
  return (
    <ReactLoading
      type={type || 'spin'}
      color="#fff"
      width={width}
      height={height}
    />
  );
};

export default memo(SmallLoading);
