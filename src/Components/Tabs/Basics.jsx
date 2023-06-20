const Basics = ({ changeTab }) => {
    return (
      <div
        id="basics"
        className="cursor-pointer text-center w-full active-tab h-8 pt-1"
        onClick={(e) => changeTab(e.target.id)}
      >
        Basics
      </div>
    );
  };
  
  export default Basics;