# Bob scraper microservice

Actually, this service just scrap the content of iberia bookings.

## Installation

Link to github project: [bob-scraper](https://github.com/bagonboard/bob-scraper)

## Deploying on server

Info about pm2:

[pm2](http://pm2.keymetrics.io/docs/usage/quick-start/)
[pm2 configuration](http://pm2.keymetrics.io/docs/usage/application-declaration/)

### Install pm2

run:

```
npm install pm2@latest -g
```

### Configuring pm2

Right now we will specify the configuration of the instances in files. Ie:

```
bob-scraper-1.json
```

### Launch server

```
pm2 start bob-scraper-1.json

ps aux | grep bob-scraper
```

### Monitoring

You can check the status of pm2 instances running:

```
pm2 monit
```

More info: [pm2 monitoring](http://pm2.keymetrics.io/docs/usage/monitoring/)
