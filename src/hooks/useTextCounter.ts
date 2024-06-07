import { useState, ChangeEvent } from 'react';

const useTextCounter = (maxLength: number, initialValue: string = '') => {
  const [content, setContent] = useState(initialValue);

  const handleCountText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (text.length <= maxLength) {
      setContent(text);
    }
  };

  return {
    content,
    handleCountText,
    currentCount: content.length,
  };
};

export default useTextCounter;
