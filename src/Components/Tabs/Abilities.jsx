const Abilities = ({ changeTab }) => {
  return (
    <div
      id="abilities"
      className="cursor-pointer text-center w-full pt-1 h-8"
      onClick={(e) => changeTab(e.target.id)}
    >
      Abilities
    </div>
  );
};

export default Abilities;