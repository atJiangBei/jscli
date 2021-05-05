#!/usr/bin/env node

const cm = require('commander');
const fs = require('fs');
const path = require('path');
const utils = require('./utils/');
const { readJSON } = require('./utils/common.js');
const { version } = readJSON(path.join(__dirname,'../package.json'));

cm.version(version, '-V --version');
cm.command('create <name>').action((name) => {
	utils.ask(name).then((answer) => {
		utils.answer(name,answer)
	})
})

cm.parse(process.argv)
