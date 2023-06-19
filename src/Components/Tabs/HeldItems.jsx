const HeldItems = ({ changeTab }) => {
  return (
    <div
      id="helditems"
      className="cursor-pointer text-center w-full"
      onClick={(e) => changeTab(e.target.id)}
    >
      HeldItems
    </div>
  );
};

export default HeldItems;
