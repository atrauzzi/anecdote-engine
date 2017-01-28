#!/usr/bin/env node
import {command} from "./Base";

command
    .command("setup", "Perform any initial setup and/or migrations required by configured drivers.")
    .command("scan", "Scan author sources for changes.")
    .command("add-author", "Add a new author to the system.")
;

command.parse(process.argv);