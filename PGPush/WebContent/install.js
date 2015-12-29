/*eslint-disable */

'use strict';

var prompt = require('prompt');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var configFile = path.join(__dirname, 'www/js/config.js');

console.log(chalk.cyan('This utility will walk you through setting up Push for PhoneGap.'));
console.log(chalk.cyan('Please refer to http://devcenter.kinvey.com/phonegap/guides/push on how to setup Push. Defaults are shown next to the question.'))
console.log(chalk.cyan('Press ^C at any time to quite.'));
console.log('');

// Customize the prompt
prompt.message = '';
prompt.delimiter = '';

// Start the prompt
prompt.start();

// Get appKey, appSecret, and redirectUri
prompt.get({
  properties: {
    appKey: {
      description: 'What is your app key?',
      required: true
    },
    appSecret: {
      description: 'What is your app secret?',
      required: true
    },
    apiHostname: {
      description: 'What is the API hostname?',
      default: 'https://baas.kinvey.com'
    },
    googleProjectId: {
      description: 'What is your Google Project ID?'
    }
  }
}, function(err, result) {
  if (err) {
    console.log(chalk.red(err));
    return;
  }

  var configFileData = '\'use strict\';\n' +
    '\n' +
    'window.APP_KEY = \'' + result.appKey + '\';\n' +
    'window.APP_SECRET = \'' + result.appSecret + '\';\n' +
    'window.API_HOSTNAME = \'' + result.apiHostname + '\';\n' +
    'window.GOOGLE_PROJECT_ID = \'' + result.googleProjectId + '\';';

  console.log();
  console.log('About to write to ' + configFile + '.');
  console.log();
  console.log(configFileData);
  console.log();

  // Check if it is correct
  prompt.get({
    properties: {
      correct: {
        description: 'Is this ok?',
        default: 'yes'
      }
    }
  }, function(err, result) {
    if (err) {
      console.log(chalk.red(err));
      return;
    }

    if (result.correct.toLowerCase() === 'yes' || result.correct.toLowerCase() === 'y') {
      // Write config file
      fs.writeFile(configFile, configFileData, function(err) {
        if (err) {
          console.log(chalk.red(err));
          return;
        }

        var phoneGapSetup = spawn('./setup.sh', ['-c', '-i']);

        phoneGapSetup.stdout.on('data', function(data) {
          console.log(data.toString());
        });

        phoneGapSetup.stderr.on('data', function(data) {
          console.log(chalk.red(data));
        });

        phoneGapSetup.on('close', function(code) {
          console.log('Done. Start the application by running `phonegap run ios --device` or `phonegap run android --device`.');
        });
      });
    }
    else {
      console.log(chalk.red('Aborted.'));
    }
  });
});
