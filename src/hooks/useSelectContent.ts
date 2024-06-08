import { useState } from 'react';

const useSelectContent = (initialContent: string) => {
  const [content, setContent] = useState(initialContent);

  const handleChangeContent = (newContent: string) => {
    setContent(newContent);
  };

  return { content, handleChangeContent };
};

export default useSelectContent;
