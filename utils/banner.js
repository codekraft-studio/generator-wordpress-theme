'use strict';

const {version, author: {name: authorName}} = require('../package.json');
const chalk = require('chalk');

module.exports = chalk`
{bold                   }{cyan         __               __               }
{bold  .--.--.--.-----. }{cyan .-----.|  |_.---.-.----.|  |_.-----.----. }
{bold  |  |  |  |  _  | }{cyan |__ --||   _|  _  |   _||   _|  -__|   _| }
{bold  |________|   __| }{cyan |_____||____|___._|__|  |____|_____|__|   }
{bold           |__|    }{cyan                                           }
                         {cyan      v${version} by ${authorName}         }
`;
