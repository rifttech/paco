#!/usr/bin/env node

const pkg = require("./../package.json");
const program = require("commander");
const { initialze } = require("./../lib");

program.version(pkg.version);

program
    .command("init <package>")
    .description("Create a server package")
    .action((package) => initialze(package));

program.parse(process.argv);
