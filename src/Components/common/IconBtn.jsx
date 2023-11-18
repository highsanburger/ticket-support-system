import React from 'react';
import { FiEdit } from 'react-icons/fi';
import PropTypes from 'prop-types';

const IconBtn = ({ text, onclick, children, disabled }) => {
  return (
    <button
      className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900 undefined'
      disabled={disabled}
      onClick={onclick}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
      <FiEdit />
    </button>
  );
};

IconBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default IconBtn;
