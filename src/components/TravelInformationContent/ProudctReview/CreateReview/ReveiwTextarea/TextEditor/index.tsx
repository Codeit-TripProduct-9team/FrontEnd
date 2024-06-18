import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(async () => await import('react-quill'), {
  ssr: false,
});

interface TextEditorProps {
  content: string;
  handleChangeTextArea: (content: string) => void;
}

const TextEditor = ({ content, handleChangeTextArea }: TextEditorProps) => {
  const handleChangeText = (value: string) => {
    handleChangeTextArea(value);
  };

  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'underline', 'strike', 'blockquote'],
      ['link'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };

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
    'clean',
  ];

  console.log(content);
  return (
    <ReactQuill
      className="w-[98%] h-170 py-18 px-58"
      placeholder="이곳에서의 경험은 어떠셨나요?"
      value={content}
      onChange={handleChangeText}
      theme="snow"
      modules={modules}
      formats={formats}
    />
  );
};

export default TextEditor;
