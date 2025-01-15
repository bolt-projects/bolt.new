# Project
All changes will still happen in the orginal repo, https://github.com/openaisoftware/bolt.new, until the core is done. I belive that we still need somthing simialr to the following commits from bolt.diy and I also included the orginal authors of each that we still need (These will not be striped from bolt.diy but a remake using what we have learned and now that we know where it is going).

## Goal
Our goal is to have a soild core that we can extend from into multiple differnt projects. This will mimic the bolt.new current state using open source inspired solutions from bolt.diy. This will give all projects moving forward a clean history with update dependances. Large refactoring and documentation should be kept until all the core is in the repo and only small specfic refactor for that PR should be done. Better logging, more dependance updates, documenation, large refactoring should be kept until the core is built.

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
- [ ] (@thecodacus) Add Starter Template Options
- [ ] (@thecodacus) Bolt terminal to see the output of LLM run commands
- [ ] (@thecodacus) Load Git Projects and from URL
- [ ] (@thecodacus) Detect terminal Errors and ask bolt to fix it
- [ ] (@wonderwhy-er) Load local projects into the app
- [ ] (@wonderwhy-er) Detect package.json and commands to auto install & run preview for folder and git import
- [ ] (@wonderwhy-er) Ability to revert code to earlier version
- [ ] (@dustinwloring1988) characters to valid list for titles 

### Second Update:
- [ ] (@thecodacus) Current Version For Check For Updates
- [ ] (@wonderwhy-er) Detect preview Errors and ask bolt to fix it
- [ ] (@dustinwloring1988) Simple Setting Modal 
- [ ] (@goncaloalves) Publish projects directly to GitHub
- [ ] (@muzafferkadir) Ability to sync files (one way sync) to local folder
- [ ] (@Stijnus) Open Preview in new tab

### Third Update:
- [ ] (@wonderwhy-er) Fix for CORS Issue
- [ ] (@Stijnus) GitHub Integration
- [ ] (@AbdullahOmar0) Git Clone Dialog
- [ ] (@qwikode) Mobile friendly


### Fourth Update:
- [ ] improved logging (simialar to bolt.diy)
- [ ] large code refactor (refactor some as we go then a lot more of the heavy stuff here)
- [ ] update ai package to atleast version 4.0.0 (some code will need updated for this so after the refactoring)
- [ ] test llm provider (this will make testing eaies and cheaper)

## Lastly:
- [ ] update other dependances (update what we can so that it dose not have to be done and all depercated code will be removed for the core)
- [ ] bug fixes (any bug fixes that are found, do this for a while before moving on to have a soild core to work from)
- [ ] documentation (a good documentation, though this will not be the final but a good start to take into bolt.diy)

### Then project bolt.diy is reborn with the following:
- [ ] add a plugin / extension system (This is where all the provider types, models, prompts, etc will be shown and all created and managed by the community)
