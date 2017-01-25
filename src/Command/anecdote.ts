#!/usr/bin/env node
import command from "./Base";


command
    .command("setup", "Perform any initial setup and/or migrations required by configured drivers.")
    .command("run", "Attempt batch operations.")
;

command.parse(process.argv);