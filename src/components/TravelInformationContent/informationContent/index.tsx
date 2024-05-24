const InformationList = () => {
  return (
    <div className="flex w-full gap-30  border-b-3">
      <button className="p-20">website</button>
      <button className="p-20">website2</button>
      <button className="p-20">website3</button>
      <button className="p-20">website4</button>
      <div className="flex gap-20 p-20">
        <div>🍳</div>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};

export default InformationList;
