import chalk from "chalk";
import moment from "moment";

const logger = {
    sucess : (args: string, bold: boolean = false) => {
        if (bold) return console.log("[" +  chalk.rgb(40, 175, 40)("SUCCESS")+ "]" + chalk.bold.black(` ${moment().format("HH:mm:ss")} `) + chalk.bold(`${args}`));
        if (!bold) return console.log("[" +  chalk.rgb(40, 175, 40)("SUCCESS")+ "]" + chalk.bold.black(` ${moment().format("HH:mm:ss")} `) + (`${args}`));
    },
    error : (args: string, bold: boolean = false) => {
        if (bold) return console.log("[" +  chalk.rgb(255, 10, 10)("ERROR")+ "]" + chalk.bold.black(` ${moment().format("HH:mm:ss")} `) + chalk.bold(`${args}`));
        if (!bold) return console.log("[" +  chalk.rgb(255, 10, 10)("ERROR")+ "]" + chalk.bold.black(` ${moment().format("HH:mm:ss")} `) + (`${args}`));
    },
    info : (args: string, bold: boolean = false) => {
        if (bold) return console.log("[" + chalk.rgb(155, 135, 0)("INFO")+ "]" + chalk.bold.black(` ${moment().format("HH:mm:ss")} `) + chalk.bold(`${args}`));
        if (!bold) return console.log("[" + chalk.rgb(155, 135, 0)("INFO")+ "]" + chalk.bold.black(` ${moment().format("HH:mm:ss")} `) + (`${args}`));
    },
    test : (args: string, bold: boolean = false) => {
        if (bold) return console.log("[" + chalk.rgb(135, 205, 250)("TEST")+ "]" + chalk.bold.black(` ${moment().format("HH:mm:ss")} `) + chalk.bold(`${args}`));
        if (!bold) return console.log("[" + chalk.rgb(135, 205, 250)("TEST")+ "]" + chalk.bold.black(` ${moment().format("HH:mm:ss")} `) + (`${args}`));
    }
}

export default logger;