#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
#!/bin/bash
echo "Server type"
ec2Type=$(curl http://169.254.169.254/latest/meta-data/instance-type 2>/dev/null)
if [ $ec2Type="c5a.2xlarge" ]
then
  npm run start:prod
else
  npm run start:mvstaging
fi
sudo systemctl restart apache2.service
echo 'Apache service started'
echo 'Site is UP'
