import { useState } from 'react';

const useFocusOutClose = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 500);
  };

  return { isFocused, handleFocus, handleBlur };
};

export default useFocusOutClose;
