# QSI - Base Application
## Installation
- git clone https://github.com/qsi-info/base.app.git <Application_Name>
- cd <Application_Name>
- npm install
- Change your database informations in config/adapters.js
- Lift your sails server
- Enter the default admin credentials: username: admin, password: admin
- Configure the authentification settings
- Enjoy


###To use as a windows service.
Use Always Up and point on the START.bat
You can also change the port in this file default 8001 in production.

### Redis session store
By default the application use Redis session store on the same server. If you want to use different configuration change those two files
- config/session.js
- config/sockets.js