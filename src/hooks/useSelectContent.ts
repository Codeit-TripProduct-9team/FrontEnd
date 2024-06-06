import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useSelectContent = (initialContent: string) => {
  const [content, setContent] = useState(initialContent);
  const route = useRouter();

  useEffect(() => {
    const { content: queryContent } = route.query;
    if (typeof queryContent === 'string') {
      setContent(queryContent);
    }
  }, [route.query]);

  const handleChangeContent = (newContent: string) => {
    setContent(newContent);
    route.push({ pathname: route.pathname, query: { ...route.query, content: newContent } });
  };

  return { content, handleChangeContent };
};

export default useSelectContent;
