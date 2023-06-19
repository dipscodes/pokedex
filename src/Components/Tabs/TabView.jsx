function TabView({ tab, pokemonData }) {
  const capatalize = (string) => {
    return string[0].toUpperCase() + string.substring(1);
  }
  function dataToVisualize() {
    if (tab === "abilities") {
      return (
        <ul>
          {pokemonData.abilities.map((abilityObj) => {
            return <li>{capatalize(abilityObj.ability.name)}</li>;
          })}
        </ul>
      );
    } else if (tab === "moves") {
      return (
        <ul>
          {pokemonData.moves.map((pokemonMoveObj) => {
            return <li>{capatalize(pokemonMoveObj.move.name)}</li>;
          })}
        </ul>
      );
    } else if (tab === "helditems") {
      return (
        <ul>
          {pokemonData.held_items.map((heldItemObj) => {
            return <li>{capatalize(heldItemObj.item.name)}</li>;
          })}
        </ul>
      );
    }
  }
  return <div>{dataToVisualize()}</div>;
}

export default TabView;
