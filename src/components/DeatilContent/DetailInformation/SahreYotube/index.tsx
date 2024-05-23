const ShareYoutube = () => {
  const hanldeShareModal = () => {
    alert('공유 모달');
  };
  return (
    <button className="text-30" onClick={hanldeShareModal}>
      🔄
    </button>
  );
};

export default ShareYoutube;
