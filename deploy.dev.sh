 #!/bin/bash
 cd /var/www/html/shinomikotokai-Frontend
 cp .env.stg .env
 git pull origin develop || exit
 npm install || exit
 npm run build || exit