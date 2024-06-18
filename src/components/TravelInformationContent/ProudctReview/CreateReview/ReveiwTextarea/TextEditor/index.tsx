import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';

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
      [{ header: [1, 2, false] }],
      ['bold', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      [{ align: [] }, { color: [] }, { background: [] }],
    ],
  };

  const formats = [
    'header',
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
    'image',
    'video',
    'align',
    'background',
  ];

  return (
    <ReactQuill
      className="w-[98%] h-170 py-18 px-58"
      placeholder="이곳에서의 경험은 어떠셨나요?"
      value={content}
      onChange={handleChangeText}
      theme="bubble"
      modules={modules}
      formats={formats}
    />
  );
};

export default TextEditor;
