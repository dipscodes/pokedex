function TabView({ tab, pokemonData }) {
  const capatalize = (string) => {
    return string[0].toUpperCase() + string.substring(1);
  }
  function dataToVisualize() {
    if (tab === "abilities") {
      return (
        <ul>
          {pokemonData.abilities.map((abilityObj) => {
            return <li key={abilityObj.ability.name}>{capatalize(abilityObj.ability.name)}</li>;
          })}
        </ul>
      );
    } else if (tab === "moves") {
      return (
        <ul>
          {pokemonData.moves.map((pokemonMoveObj) => {
            return <li key={pokemonMoveObj.move.name}>{capatalize(pokemonMoveObj.move.name)}</li>;
          })}
        </ul>
      );
    } else if (tab === "helditems") {
      return (
        <ul>
          {pokemonData.held_items.map((heldItemObj) => {
            return <li key={heldItemObj.item.name}>{capatalize(heldItemObj.item.name)}</li>;
          })}
        </ul>
      );
    } else if(tab === 'basics') {
      return <div className="">'hello there'</div>;
    }
  }
  return <div className="border-solid border-text-generic-color-muted w-10/12 border-t-2">{dataToVisualize()}</div>;
}

export default TabView;
