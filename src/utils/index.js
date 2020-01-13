const fs = require("fs");
const shell = require("shelljs");
const inquirer = require("inquirer");
const clone = require("git-clone");
const chalk = require("chalk");
const constants = require("./constants");


function removeFile(file) {
	shell.rm("-rf", file)
}

function changePackageJson(file, key, newValue) {
	const packageJson = JSON.parse(fs.readFileSync(file, "utf-8"));
	packageJson[key] = newValue;
	fs.readFileSync(file, JSON.stringify(packageJson, "", "\t"))
}

function getBranchName(beFrame, useTs) {
	const tsFlag = "-ts";
	switch (beFrame) {
		case constants.EXPRESS:
			if (useTs) {
				return constants.EXPRESS + tsFlag
			} else {
				return constants.MASTER
			}
		case constants.KOA2:
			if (useTs) {
				return constants.KOA2 + tsFlag
			} else {
				return constants.KOA2
			}
		default:
			return constants.MASTER
	}
}

function ask(name) {
	return inquirer.prompt([{
			type: "input",
			name: "projectName",
			message: "请输入项目名称",
			default: name
		},
		{
			type: "input",
			name: "beFrame",
			message: `请选择后端开发框架(${constants.EXPRESS}/${constants.KOA2}):`,
			default: constants.EXPRESS
		},
		{
			type: "input",
			message: "是否使用typescript",
			name: "ts"
		}
	])
}

function answer(answer) {
	if (answer.projectName) {
		const pwd = shell.pwd();
		const projectPath = `${pwd}/${answer.projectName}`;
		fs.exists(projectPath, function(exists) {
			if (exists) {
				console.log(chalk.green("项目已存在"));
				process.exit(-1);
			} else {
				console.log(chalk.green("项目正在初始化"));
				const branchName = getBranchName(answer.beFrame, answer.ts);
				clone(`地址`, projectPath, {
					checkout: branchName
				}, function() {
					removeFile(`${projectPath}/.git`);
					removeFile(`${projectPath}/.package-lock.json`);
					changePackageJson(`${projectPath}/package.json`, "name", answer.projectName)
					console.log(chalk.green("项目构建完毕"));
				})
			}
		})
	}
}


module.exports = {
	removeFile,
	changePackageJson,
	ask,
	answer
}
