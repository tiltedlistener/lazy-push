#!/usr/bin/env node

var git = require('git-rev');
var chalk = require('chalk');
var exec = require('exec');

var error = chalk.bold.red;
var success = chalk.bold.green;

///////////////////////////////////////////////////////////
function log(msg) {
  console.log(success(msg));
}


///////////////////////////////////////////////////////////
function err(msg) {
  log(error(msg));
}


///////////////////////////////////////////////////////////
function addAllToGit(msg) {
  exec('git add --all', function(error, out, code) {
      if (err instanceof Error) {
        err(error);
        return false;
      } else {
        log("Successfully added all.");
        commitWithMessage(msg);
      }
  });
}


///////////////////////////////////////////////////////////
function commitWithMessage(msg) {
  var messageString = 'git commit -m "' + msg + '"';
  exec(messageString, function(error, out, code) {
      if (err instanceof Error) {
        err(error);
        return false;
      } else {
        log("Committing with message: " + msg);
        pushToCurrentBranch(); 
      }
  });
}


///////////////////////////////////////////////////////////
function pushToCurrentBranch() {
    git.branch(function (str) {
      exec('git push origin ' + str, function(error, out, code) {
        if (err instanceof Error) {
          err(error);
          return false;
        } else {
          log(error);
        }
      });
  });
}


///////////////////////////////////////////////////////////
function main() {
  var msg = process.argv.slice(2);
  if (!msg) {
    err('You must include a commit message');
    return;
  }
  addAllToGit(msg);
}

module.exports.main = main;

