const Stats = ({ changeTab }) => {
  return (
    <div
      id="stats"
      className="cursor-pointer text-center w-full pt-1 h-8"
      onClick={(e) => changeTab(e.target.id)}
    >
      Stats
    </div>
  );
};

export default Stats;