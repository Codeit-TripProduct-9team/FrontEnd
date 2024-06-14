import { useState, useEffect } from 'react';

const useSelectContent = (initialContent: string) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSelectContent = (newContent: string) => {
    setContent(newContent);
  };

  return { content, handleSelectContent };
};

export default useSelectContent;
