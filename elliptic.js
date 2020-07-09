const elliptic = require("elliptic");
const secp256k1 = new elliptic.ec("secp256k1");

const fromPrivate = (web3, privateKey) => {
  const buffer = new Buffer(privateKey, "hex");
  const ecKey = secp256k1.keyFromPrivate(buffer);
  const publicKey = "0x" + ecKey.getPublic(false, "hex").slice(2);
  const publicHash = web3.utils.keccak256(publicKey);
  return {
    address: publicHash.slice(-40),
    publicKey,
    privateKey,
  };
};

exports.fromPrivate = fromPrivate;
