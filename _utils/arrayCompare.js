function sortArray(arr = null, isDesc = false) {
  if (!arr) return null;

  if (!isDesc) {
    return arr.sort(() => -1);
  } else return arr.sort(() => 1);
}
exports.sortArray = sortArray;

exports.compareArrayEquals = function (arr1 = null, arr2 = null) {
  if (!arr1 || !arr2) return false;

  if (arr1.length !== arr2.length) return false;

  let isEquals = true;

  arr1 = sortArray(arr1);
  arr2 = sortArray(arr2);

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return isEquals;
};
