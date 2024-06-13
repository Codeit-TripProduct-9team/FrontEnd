import { useState } from 'react';

const useSelectContent = (initialContent: string) => {
  const [content, setContent] = useState(initialContent);

  const handleSelectContent = (newContent: string) => {
    setContent(newContent);
  };

  return { content, handleSelectContent };
};

export default useSelectContent;
