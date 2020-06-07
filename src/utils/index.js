export function startRound(pijuni, field, color, playerStones) {
  let locationObj = checkPosition("start", pijuni, field);
  if (locationObj) {
    if (locationObj.kick.length) {
      let newArr = kick(locationObj.kick, field, playerStones);
      return moveOn("start", pijuni, color, newArr, locationObj, playerStones);
    }
    return moveOn("start", pijuni, color, field, locationObj, playerStones);
  }
  return false;
}

export function walking(pijuni, field, color, diceNumber, playerStones) {
  let locationObj = checkPosition("walk", pijuni, field, diceNumber);
  if (locationObj) {
    if (locationObj.kick.length) {
      let newArr = kick(locationObj.kick, field, playerStones);
      return moveOn(
        "walk",
        pijuni,
        color,
        newArr,
        locationObj,
        playerStones,
        diceNumber
      );
    }
    return moveOn(
      "walk",
      pijuni,
      color,
      field,
      locationObj,
      playerStones,
      diceNumber
    );
  }
  return false;
}

function moveOn(
  action,
  pijuni,
  color,
  field,
  locationObj,
  playerStones,
  diceNumber
) {
  let newArr;
  console.log(playerStones[color], diceNumber, pijuni);

  playerStones[color].stones.map((stones) => {
    if (
      stones.stoneId === pijuni.stoneId ||
      stones.stoneId === pijuni.x[0].stoneId
    ) {
      !diceNumber ? stones.steps++ : (stones.steps += diceNumber);
    }
    return stones;
  });
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

export function kick(toKick, field, playerStones) {
  let newArr;
  toKick.forEach((element) => {
    playerStones[element.player].stones.map((stones) => {
      if (stones.stoneId === element.stoneId) {
        return (stones.steps = 0);
      }
      return stones;
    });
    newArr = field.map((row) => {
      return row.map((fields) => {
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
