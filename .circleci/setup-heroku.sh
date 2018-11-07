#!/bin/bash
set -eu
git remote add heroku https://git.heroku.com/blocktensor.git
wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh
cat > ~/.netrc << EOF
machine api.heroku.com
login $HEROKU_LOGIN
password $HEROKU_API_KEY
machine git.heroku.com
login $HEROKU_LOGIN
password $HEROKU_API_KEY
EOF
chmod 600 ~/.netrc
