#!/bin/bash
cd ~
pwd

rm -fR Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/src/app/plugins/modules/eform-dashboard-pn

cp -av Documents/workspace/microting/eform-angular-frontend/eform-client/src/app/plugins/modules/eform-dashboard-pn Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/src/app/plugins/modules/eform-dashboard-pn

rm -fR Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eFormAPI/Plugins/eFormDashboard.Pn

cp -av Documents/workspace/microting/eform-angular-frontend/eFormAPI/Plugins/eFormDashboard.Pn Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eFormAPI/Plugins/eFormDashboard.Pn

# Test files rm

rm -fR Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/e2e/Tests/eform-dashboard-settings
rm -fR Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/e2e/Tests/eform-dashboard-general
rm -fR Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/e2e/Page\ objects/eFormDashboard
rm -fR Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/wdio-headless-plugin-step2.conf.js

# Test files cp

cp -a Documents/workspace/microting/eform-angular-frontend/eform-client/e2e/Tests/eform-dashboard-settings Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/e2e/Tests/eform-dashboard-settings
cp -a Documents/workspace/microting/eform-angular-frontend/eform-client/e2e/Tests/eform-dashboard-general Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/e2e/Tests/eform-dashboard-general
cp -a Documents/workspace/microting/eform-angular-frontend/eform-client/e2e/Page\ objects/eFormDashboard Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/e2e/Page\ objects/eFormDashboard
cp -a Documents/workspace/microting/eform-angular-frontend/eform-client/wdio-plugin-step2.conf.js Documents/workspace/microting/eform-angular-eform-dashboard-plugin/eform-client/wdio-headless-plugin-step2.conf.js
