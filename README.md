# Project Overview
All development changes will continue in the original repository: openaisoftware/bolt.new until the core functionality is complete.

We recognize the need to incorporate elements similar to certain commits from bolt.diy. Below, we've listed these necessary updates along with their original authors. These will not be directly copied from bolt.diy, but rather reimplemented using the knowledge we've gained and with a clear direction in mind.

To streamline progress, these tasks have been divided into four separate updates. This approach helps prevent interdependencies from causing delays, though further adjustments may be necessary.
## Goals

1. **Solid Core Foundation:**
   - Develop a robust and extensible core that can support multiple projects, including:
     - **bolt.diy**
     - A vanilla **bolt.new** experience inspired by open-source solutions from **bolt.diy**
   - This strategy will provide a cleaner project history, updated dependencies, and a reliable foundation for future development.

2. **Refactoring and Documentation:**
   - Large-scale refactoring and comprehensive documentation will be postponed until the core functionality is fully implemented.
   - Only targeted, small-scale refactoring should be done within individual pull requests.
   - Major improvements (e.g., extensive refactoring, documentation overhauls) will follow once the core is complete.

### Completed So far 
- [X] Fork Orginal Project
- [X] Take inspiration from bolt.new and bolt.diy 
- [X] Image Support
- [X] Spelling and grammar check
- [X] Update dependances
- [X] Typecheck and lint fix
- [X] Docker Support
- [X] Rename and Export message support
- [X] Download project as zip
- [X] Update to latest model
- [X] Fix hanging shell
- [X] UI Fixes


### First Update:
- [ ] (@wonderwhy-er) Load local projects into the app
- [ ] (@wonderwhy-er) Detect package.json and commands to auto install & run preview for folder and git import
- [ ] (@wonderwhy-er) Ability to revert code to earlier version
- [ ] (@thecodacus) Add Starter Template Options
- [ ] (@thecodacus) Bolt terminal to see the output of LLM run commands
- [ ] (@thecodacus) Load Git Projects and from URL
- [ ] (@thecodacus) Detect terminal Errors and ask bolt to fix it
- [ ] (@dustinwloring1988) characters to valid list for titles 

### Second Update:
- [ ] (@wonderwhy-er) Fix for CORS Issue
- [ ] (@wonderwhy-er) Detect preview Errors and ask bolt to fix it
- [ ] (@thecodacus) Current Version For Check For Updates
- [ ] (@goncaloalves) Publish projects directly to GitHub
- [ ] (@muzafferkadir) Ability to sync files (one way sync) to local folder
- [ ] (@Stijnus) Open Preview in new tab

### Third Update:
- [ ] (@thecodacus) improved logging, Universal Logging System
- [ ] (@Stijnus) GitHub Integration
- [ ] (@AbdullahOmar0) Git Clone Dialog
- [ ] (@qwikode) Mobile friendly
- [ ] (@mrsimpson) test llm provider

### Fourth Update:
- [ ] large code refactor (refactor some as we go then a lot more of the heavy stuff here)
- [ ] update ai package to version 4.0.13 (some code will need updated for this so after the refactoring)
- [ ] update other dependances (update what we can so that it dose not have to be done and all depercated code will be removed for the core)

## Lastly:
- [ ] bug fixes (any bug fixes that are found, do this for a while before moving on to have a soild core to work from)
- [ ] documentation (a good documentation start explain the structure and use)

### Then project bolt.diy is reborn with the following:
- [ ] style and branding changes
- [ ] add a plugin / extension system (This is where all the provider types, models, prompts, etc will be shown and all created and managed by the community)
