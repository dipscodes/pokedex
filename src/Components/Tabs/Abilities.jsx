const Abilities = ({ changeTab }) => {
  return (
    <div
      id="abilities"
      className="cursor-pointer text-center w-full active-tab"
      onClick={(e) => changeTab(e.target.id)}
    >
      Abilities
    </div>
  );
};

export default Abilities;