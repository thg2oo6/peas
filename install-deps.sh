#!/usr/bin/env bash
git fetch
if [[ $# -gt 0 ]] ; then
	git reset --hard HEAD
fi
git pull
npm install