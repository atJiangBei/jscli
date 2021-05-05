const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const inquirer = require("inquirer");
const clone = require("git-clone");
const chalk = require("chalk");
const constants = require("./constants");
const { changePackageJson ,removeFile,removeEslintDependencies } = require("./common.js");






function ask(name) {
	return inquirer.prompt([
		{
			type: "input",
			name: "projectName",
			message: "Enter project name",
			default: name
		},
		{
			type: "list",
			name: "frame",
			message: `Select development framework`,
			default: "vue2.x",
			choices:['vue2.x','react']//'vue@next'
		},
		{
			type: "list",
			name: "projectType",
			message: `Admin project or mobile project?`,
			default: "admin_project",
			choices:['admin_project','mobile_project']
		},
		{
			type:"checkbox",
			message:"Select configuration item",
			name:"integrate",
			choices:[
				"eslint",
			]
		}
	])
}

function answer(dirname,answer) {
	if (answer.projectName) {
		const pwd = shell.pwd();
		const projectPath = `${pwd}\\${dirname}`;
		console.log(chalk.green(projectPath));
		fs.exists(projectPath, function(exists) {
			if (exists) {
				console.log(chalk.green("File already exist"));
				process.exit(-1);
			} else {
				if(answer.frame === 'react'){
					console.log(chalk.green("Not yet"))
					process.exit(-1);
					return;
				}
				console.log(chalk.green("Initializing project..."));
				const git_path = `${constants.git_path_prefix}/${answer.frame}_${answer.projectType}`;
				clone(git_path, projectPath, {}, function() {
					if(!answer.integrate.includes("eslint")){
						removeFile(`${projectPath}\\.eslintignore`);
						removeFile(`${projectPath}\\.eslintrc.js`);
						removeEslintDependencies(`${projectPath}\\package.json`)
					}
					changePackageJson(`${projectPath}\\package.json`, "name", answer.projectName)
					console.log(chalk.green("The project is completed"));
				})
			}
		})
	}
}


module.exports = {
	removeFile,
	ask,
	answer
}
