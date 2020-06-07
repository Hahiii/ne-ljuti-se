import localStorage from "redux-persist/es/storage";

export function startRound(pijuni, field, color) {
  let locationObj = checkPosition("start", pijuni, field);
  if (locationObj) {
    if (locationObj.kick.length) {
      let newArr = kick(locationObj.kick, field);
      return moveOn("start", pijuni, color, newArr, locationObj);
    }
    return moveOn("start", pijuni, color, field, locationObj);
  }
  return false;
}

export function walking(pijuni, field, diceNumber) {
  let locationObj = checkPosition("walk", pijuni, field, diceNumber);
  console.log(locationObj);
  if (locationObj) {
    if (locationObj.kick.length) {
      let newArr = kick(locationObj.kick, field);
      return moveOn("walk", pijuni, "", newArr, locationObj);
    }
    return moveOn("walk", pijuni, "", field, locationObj);
  }
  return false;
}

function moveOn(action, pijuni, color, field, locationObj) {
  let newArr;
  switch (action) {
    case "start":
      newArr = field.map((row, rowIndex) =>
        row.map((fields, fieldsIndex) => {
          if (
            rowIndex === Number(locationObj.position[0]) &&
            fieldsIndex === Number(locationObj.position[1])
          ) {
            return {
              ...fields,
              x: [{ player: color, stoneId: pijuni.stoneId }],
            };
          }
          if (fields.stoneId === pijuni.stoneId && fields.x === pijuni.x) {
            return { ...fields, x: [] };
          }
          return { ...fields };
        })
      );
      return newArr;
    case "walk":
      newArr = field.map((row, rowIndex) =>
        row.map((fields, fieldsIndex) => {
          if (
            rowIndex === Number(locationObj.position[0]) &&
            fieldsIndex === Number(locationObj.position[1])
          ) {
            return { ...fields, x: [{ ...pijuni.x[0] }] };
          }
          if (fields.p === pijuni.p) {
            return { ...fields, x: [] };
          }
          return { ...fields };
        })
      );
      return newArr;
    default:
      break;
  }
}

// export function getHome() {}

export function kick(toKick, field) {
  let newArr;
  toKick.forEach((element) => {
    newArr = field.map((row, rowIndex) => {
      return row.map((fields, fieldIndex) => {
        if (
          fields.stoneId === element.stoneId &&
          fields.color === element.player
        ) {
          return { ...fields, x: [{ ...element }] };
        }
        return { ...fields };
      });
    });
  });
  return newArr;
}

function checkPosition(position, player, field, diceNumber) {
  let location = {};
  switch (position) {
    case "start":
      field.map((row, rowIndex) => {
        row.map((fields, fieldIndex) => {
          if (fields[position] === player.x[0].player) {
            if (!fields.x.length) {
              location.position = [rowIndex, fieldIndex];
              location.kick = [];
              return location;
            } else {
              location.position = [rowIndex, fieldIndex];
              location.kick = [...fields.x];
              console.log("cant move to this fields", location);
              return location;
            }
          }
          return;
        });
      });
      break;
    case "walk":
      let toGoPosition =
        player.p + diceNumber >= 40
          ? player.p + diceNumber - 40
          : player.p + diceNumber;
      field.map((row, rowIndex) => {
        row.map((fields, fieldIndex) => {
          if (fields.p === Number(toGoPosition)) {
            if (!fields.x.length) {
              location.position = [rowIndex, fieldIndex];
              location.kick = [];
              return location;
            } else {
              location.position = [rowIndex, fieldIndex];
              location.kick = [...fields.x];
              return location;
            }
          }
          return;
        });
      });
      break;

    default:
      break;
  }
  return location;
}
