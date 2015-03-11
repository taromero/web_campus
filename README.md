# Web-Campus

App to manage education institution's stuff.

### Deploying

Basically use this buildpack: https://github.com/AdmitHub/meteor-buildpack-horse.

1. Create the heroku app: `heroku create --stack cedar --buildpack https://github.com/AdmitHub/meteor-buildpack-horse.git`

2. Configure ROOT_URL: `heroku config:add ROOT_URL={{httpsAppURL}}`

3. Deploy: `git push heroku master`.

#### Add meteor settings

On projects root: `heroku config:add METEOR_SETTINGS="$(cat settings.json)"`

> settings.json is not under version control as it contains private keys. sample_settings.json contains the skeleton of settings.json.
