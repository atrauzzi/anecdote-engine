#!/usr/bin/env node
import {build} from "./";


build()
    .command("setup", "Perform any initial setup and/or migrations required by configured drivers.")
    .command("scanSources", "Scan author sources for changes.")
    .command("add-author", "Add a new author to the system.")
    .parse(process.argv)
;