const arrayGenerator = (number) => {
  return [...new Array(number).keys()];
};

console.log(arrayGenerator(10));
