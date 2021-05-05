const fs = require('fs');
const path = require('path');
const shell = require("shelljs");

exports.readJSON = function(filePath){
	return JSON.parse(fs.readFileSync(filePath,"utf-8"))
}

exports.changePackageJson = function(file, key, newValue) {
	const packageJson = JSON.parse(fs.readFileSync(file, "utf-8"));
	packageJson[key] = newValue;
	fs.writeFileSync(file, JSON.stringify(packageJson, "", "\t"))
}

exports.removeDependencies = function(file, key) {
	const packageJson = JSON.parse(fs.readFileSync(file, "utf-8"));
	delete packageJson['devDependencies'][key];
	fs.writeFileSync(file, JSON.stringify(packageJson, "", "\t"))
}


exports.removeFile = function(file) {
	shell.rm("-rf", file)
}

exports.removeEslintDependencies = function(file) {
	const packageJson = JSON.parse(fs.readFileSync(file, "utf-8"));
	delete packageJson['devDependencies']['@vue/cli-plugin-eslint'];
	delete packageJson['devDependencies']['babel-eslint'];
	delete packageJson['devDependencies']['eslint'];
	delete packageJson['devDependencies']['eslint-plugin-vue'];
	fs.writeFileSync(file, JSON.stringify(packageJson, "", "\t"))
}
