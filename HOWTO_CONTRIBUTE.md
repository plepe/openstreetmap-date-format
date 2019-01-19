## Install development environment
First, you need [nodejs](https://nodejs.org/) and [git](https://nodejs.org/en/) installed.

On Ubuntu:
```sh
sudo apt-get install node git
```

Then, clone the repository and install sub modules.
```sh
git clone https://github.com/plepe/openstreetmap-date-format
cd openstreetmap-date-format
npm install
npm install --only=dev # only needed, if your npm is in production mode
```

You can test, if everything works be running `npm run test`. You should not get any error messages.

## Start developing code for your locale.
You need the [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) of your language. In the example below, I used 'xy' as example. Replace this by the language code.

Create files for your language:
```sh
cp templates/en.js templates/xy.js
cp locale/template.js locale/xy.js
cp test/en.js test/xy.js
```

Next:

Adapt the files `templates/xy.js`, `locale/xy.js` and `test/xy.js`.

## Test if your code works
You can test if the translations works with `npm run test`.

You should also check, if the translation works in a browser.

On the command line enter: `npm run build-test && npm run start`.

Then you can enter the addres `http://localhost:3000` in your webbrowser. You should see the test-page of one of the locales. In the select box on the left top you can select your locale.

Press Ctrl-C on the command line to stop the webserver.

## Commit and publish changes
Before publishing your code, please check your code style with `npm run lint`. It should follow the recommendations of [standard JS](https://standardjs.com/).

To commit your changes:
```sh
git add templates/xy.js locale/xy.js test/xy.js
git commit
```

* Go to https://github.com/plepe/openstreetmap-date-format
* Fork the repository by clicking the button on the right top

In the repository, run:
```sh
git remote add myrepo https://github.com/USERNAME/openstreetmap-date-format
git push myrepo -u master
```

Reload https://github.com/USERNAME/openstreetmap-date-format in the browser.
A button for creating a pull request should appear. Follow instructions.
