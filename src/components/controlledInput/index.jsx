import React, { Component } from 'react';

export default function ControlledInput({
  callback,
  type = 'text',
  disabled = false,
  readOnly = false,
  defaultValue,
  placeholder = ''
}) {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    callback(value);
  }, [value]);

  return (
    <input
      defaultValue={defaultValue}
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target: { value } }) => setValue(value)}
    />
  );
}

// export default function ControlledInput();