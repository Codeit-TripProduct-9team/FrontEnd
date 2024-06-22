import { ComponentProps, useMemo, useRef } from 'react';

import dynamic from 'next/dynamic';

import { instance } from '@/src/api/axios';

import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: ComponentProps<typeof ReactQuill>) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  },
);

interface TextEditorProps {
  content: string;
  handleChangeTextArea: (content: string) => void;
}

const TextEditor = ({ content, handleChangeTextArea }: TextEditorProps) => {
  const quillRef = useRef<any>(null);

  const handleChangeText = (value: string) => {
    handleChangeTextArea(value);
  };

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'pyaejpx8');
          const body = formData;
          const response = await instance.post(`https://api.cloudinary.com/v1_1/dhvpt9ojq/image/upload`, body);

          const imageUrl = response.data.url;
          const range = quillRef.current.getEditorSelection();
          quillRef.current.getEditor().insertEmbed(range.index, 'image', imageUrl);
          quillRef.current.getEditor().setSelection(range.index + 1);
          document.body.querySelector(':scope > input').remove();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'underline', 'strike', 'blockquote'],
          ['link'],
          ['image'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    'color',
    'size',
    'bold',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'background',
    'image',
    'clean',
  ];

  return (
    <ReactQuill
      forwardedRef={quillRef}
      className="w-[98%] py-18 px-58"
      placeholder="이곳에서의 경험은 어떠셨나요?"
      value={content}
      onChange={handleChangeText}
      theme="snow"
      modules={modules}
      formats={formats}
    />
  );
};

TextEditor.displayName = 'TextEditor';

export default TextEditor;
