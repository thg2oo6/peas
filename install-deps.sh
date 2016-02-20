#!/usr/bin/env bash
git fetch
if [[ $# -gt 0 ]] ; then
	git reset --hard HEAD
fi
git pull

npm install -g ember-cli@2.3
npm install -g nodemon
npm install -g bower
npm install
cd ember && npm install && bower install

echo "Run 'bin/run' to run the app"