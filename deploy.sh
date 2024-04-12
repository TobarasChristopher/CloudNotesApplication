
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y curl

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install 18
nvm use 18
npm install -g pm2
pm2 stop CloudNotesApplication
cd CloudNotesApplication/

rm -rf node_modules
npm install

pm2 start app.js --name CloudNotesApplication
