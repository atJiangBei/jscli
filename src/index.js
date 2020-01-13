const cm = require('commander');
const utils = require('./utils');

cm.version('1.0.8', '-v --version');

cm.command('init <name>').action((name) => {
	utils.ask(name).then((answer) => {
		utils.answer(answer)
	})
})

cm.parse(process.argv)
