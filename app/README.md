## Structure

- app - all app files
- app/components - all components including models and views
- app/shared - all shared compoents and utilities
- app/index.html -- entry point
- app/index.js -- main JS file
- app/bundle.js -- built JS bundle
- \_\_tests\_\_ - Jest unit testing


##To Build

1. npm install (installs reactify, etc)
2. Install browserfy (locally or globally)
3. Install watchify  (locally or globally)

Run command: watchify index.js -d -t reactify -v -o bundle.js

This will build the project into bundle.js and continue rebuilding as files change

parse-admin.js is a template for loading data into parse, thought the code is from a different project.
