const chalk = require('chalk');

module.exports = {
    error: (err) => {
        console.log(chalk.bgRed('[ERROR]'));
        console.log(chalk.red(err));
    },
    info: (msg) => {
        console.log(chalk.blue('[INFO] ') + msg);
    }
}