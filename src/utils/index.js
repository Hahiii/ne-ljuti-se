export function startRound(pijuni, field) {
  // console.log(pijuni);
  // console.log(pijuniSteps);
  // console.log(field);

  let newLocation = checkPosition("start", pijuni, field);

  if (newLocation) {
    return newLocation.split(",");
  }
  return false;
}

export function getHome() {}

export function kickWhileWalking() {}

export function kickAtStart() {}

function checkPosition(position, player, field) {
  // console.log(position, player, field);
  let location = "";
  field.map((row, rowIndex) => {
    row.map((fields, fieldIndex) => {
      if (fields[position] === player.x) {
        if (!fields.x.length) {
          return (location += `${rowIndex},${fieldIndex}`);
        }
      }
      return;
    });
  });
  return location;
}
