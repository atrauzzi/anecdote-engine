#!/usr/bin/env node
import Commander from "./Command";

Commander
    .command("setup", "Perform any initial setup and/or migrations required by configured drivers.")
    .command("run", "Attempt batch operations.")
;

Commander.parse(process.argv);