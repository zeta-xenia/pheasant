const CryptoJS = require('crypto-js')

function saltPass(pwd) {
	const salt = CryptoJS.lib.WordArray.random(256 / 8) // Create a 64-bype salt
	const salted = CryptoJS.PBKDF2(pwd, salt, {
		keySize: 512 / 32,
		iterations: 64
	}) // Salt the key with 512-bit size and 64 iterations

	return { salt, salted }
}

function resaltPass(pwd, salt) {
	const salted = CryptoJS.PBKDF2(pwd, salt, {
		keySize: 512 / 32,
		iterations: 64
	}) // Resalt the key with 512-bit size and 64 iterations, using the previously used salt

	return { salted }
}

function getUniqueID(email, saltedKey) {
	const uniqueID = CryptoJS.SHA3(email + saltedKey) // Cauculate the SHA3 Hash of email and the salted key as unique id

	return uniqueID
}

module.exports = { saltPass, resaltPass, getUniqueID }
