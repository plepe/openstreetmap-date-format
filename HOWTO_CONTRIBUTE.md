Clone 

```sh
git clone https://github.com/plepe/openstreetmap-date-format
cd openstreetmap-date-format
npm install
cp templates/en.js templates/xy.js
cp locale/template.js locale/xy.js
cp test/en.js test/xy.js
```

Next:

Change the files `templates/xy.js`, `locale/xy.js` and `test/xy.js`.

You can test if the translations works with `npm run test`. Check
code style with `npm run lint`.

When finished:
```sh
git add templates/xy.js locale/xy.js test/xy.js
git commit
```

* Go to https://github.com/plepe/openstreetmap-date-format
* Fork the repository by clicking the button on the right top

Run in the repository:
```sh
git remote add myrepo https://github.com/USERNAME/openstreetmap-date-format
git push myrepo -u master
```

Reload https://github.com/USERNAME/openstreetmap-date-format in the browser.
A button for creating a pull request should appear. Follow instructions.
