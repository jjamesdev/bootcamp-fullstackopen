import React from 'react';

const Notification = ({ config }) => {
  let { message, status } = config;

  if (message === null) return null;

  return (
    <div className={ status }>
      { message }
    </div>
  )
}

export default Notification;
