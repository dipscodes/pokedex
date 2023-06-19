const Moves = ({ changeTab }) => {
  return (
    <div
      id="moves"
      className="cursor-pointer text-center w-full"
      onClick={(e) => changeTab(e.target.id)}
    >
      Moves
    </div>
  );
};

export default Moves;
