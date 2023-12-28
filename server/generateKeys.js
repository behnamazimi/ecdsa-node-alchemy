const {secp256k1} = require("ethereum-cryptography/secp256k1")
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils")
const {sha256} = require("ethereum-cryptography/sha256")

const dummyPrivateKey = secp256k1.utils.randomPrivateKey();

const privateKey = secp256k1.utils.randomPrivateKey();
console.log("privateKey:", toHex(privateKey));

// get public key
const publicKey = secp256k1.getPublicKey(privateKey);
console.log("publicKey:", toHex(publicKey));

// sing a message using private key
const message = "Hello World!";
const messageBytes = utf8ToBytes(message);
const messageHash = sha256(messageBytes);
const signature = secp256k1.sign(messageHash, privateKey);
// console.log("signature:", signature);

// uint8array to hex
// const publickKeyFromSignature = toHex(signature.recoverPublicKey(messageHash).toRawBytes());
// console.log("public key from signature:", publickKeyFromSignature);

// verify signature using public key
// const verified = secp256k1.verify(signature, messageHash, publicKey);
// console.log("verified:", verified);