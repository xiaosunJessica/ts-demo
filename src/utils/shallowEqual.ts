function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  for (let key1 in objA) {
    if (
      objA.hasOwnProperty(key1) &&
      (!objB.hasOwnProperty(key1) || objA[key1] !== objB[key1])
    ) {
      return false;
    }
  }

  for (let key2 in objB) {
    if (
      objB.hasOwnProperty(key2) &&
      (!objA.hasOwnProperty(key2) || objA[key2] !== objB[key2])
    ) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;
