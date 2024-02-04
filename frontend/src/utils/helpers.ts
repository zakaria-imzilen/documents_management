export const convertArrToObj = <T>(
  arr: T[],
  keyToReturn: string
): { [key: string]: string } => {
  const returnedObj = {};

  arr.forEach((elem) => {
    const key = elem[keyToReturn];
    if (key) returnedObj[key] = "";
  });

  return returnedObj;
};
