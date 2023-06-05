export const contains = (where, what) => {
  for (let i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) === -1) return false;
  }
  return true;
};

export const getCountPagination = (count) => {
  return Math.ceil(count / 6);
};

export const updateObjForArray = (arrayIndex, obj) => {
  let res = {};
  let count = 0;
  for (let i of arrayIndex) {
    res[i] = obj[count];
    count++;
  }
  return res;
};

export function getArrayCountStep(step, base) {
  step--;
  let start = step * base;
  let count = 0;
  let res = [];
  while (count < base) {
    res = [...res, start];
    start++;
    count++;
  }
  return res;
}

export const checkAvailabilityKeysInKeysAndFindIdPage = (arr1, arr2) => {
  let res = [];
  if (contains(arr1, arr2)) {
    return true;
  } else {
    res = [Math.ceil(arr2[0] / 20)];
    if (res[0] !== Math.ceil(arr2[5] / 20)) {
      res = [...res, Math.ceil(arr2[5] / 20)];
    }
  }
  return res;
};
