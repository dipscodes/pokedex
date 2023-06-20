const Moves = ({ changeTab }) => {
  return (
    <div
      id="moves"
      className="cursor-pointer text-center w-full h-8 pt-1"
      onClick={(e) => changeTab(e.target.id)}
    >
      Moves
    </div>
  );
};

export default Moves;
