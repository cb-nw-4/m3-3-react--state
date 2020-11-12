// generate a random key
const RandomKey = () => {
  const key = Date.now() * Math.round(Math.random() * 1000000 + 1);
  return key;
}

export default RandomKey;
