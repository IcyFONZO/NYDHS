// Login manually through a browser and copy your .ROBLOSECURITY cookie
// Create a file "cookie" with the content: {"cookie": "PASTE COOKIE HERE"}
// After that you can use the function below and you will not have to manually login again
const rbx = require('roblox-js');
const fs = require('fs');

const cookieFile = './cookie';
const cookie = JSON.parse(fs.readFileSync(cookieFile)).cookie;
rbx.options.jar.session = cookie;
const relog = () => {
  return rbx.getVerification({url: 'https://www.roblox.com/my/account#!/security'})
    .then((ver) => {
      return rbx.getGeneralToken().then((token) => {
        return rbx.http({
          url: 'https://www.roblox.com/authentication/signoutfromallsessionsandreauthenticate',
          options: {
            method: 'POST',
            resolveWithFullResponse: true,
            verification: ver.header,
            jar: null,
            headers: {
              'X-CSRF-TOKEN': token
            },
            form: {
              __RequestVerificationToken: ver.inputs.__RequestVerificationToken
            }
          }
        }).then((res) => {
          console.log(res.statusCode);
          console.log(res.body);
          var cookies = res.headers['set-cookie'];
          if (cookies) {
            rbx.options.jar.session = cookies.toString().match(/\.ROBLOSECURITY=(.*?);/)[1];
            fs.writeFile(cookieFile, JSON.stringify({cookie: rbx.options.jar.session}), (err) => {
              if (err) {
                console.error('Failed to write cookie');
              }
            });
          }
        });
      });
    });
};

(async () => {
  console.log('...' + rbx.options.jar.session.substr(-20));
  console.log(await rbx.getCurrentUser());
  await relog();
  console.log('...' + rbx.options.jar.session.substr(-20));
  console.log(await rbx.getCurrentUser());
})();
