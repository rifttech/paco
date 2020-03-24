const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const link = require("./wildfly.links");
const { download, unzip } = require("../services");

module.exports = async function (name) {
    console.log(chalk.bgBlue(`Create Package: `), name);
    const dir = process.cwd();
    const file = path.resolve(dir, "paco.json");
    console.log(chalk.blueBright(`Create Descriptor: `), file);
    fs.writeFileSync(file, JSON.stringify({ name: name }, null, 2));
    const p = path.resolve(dir, "wf.zip");
    //console.log("artifact ", p);
    await download({ url: link.servers.WF14_0_1, path: p });
    await unzip({ src: p, dest: dir });
};
