import fse from 'fs-extra';
import R from 'ramda';

import buildFolder from './utils/folderBuilder';
import clone from './cloner';
import install from './installer';
import repos from './repos';
import users from './users';

if (process.argv.length < 3) {
  throw new Error('A path to clone to is required with param -p');
}

const path = process.argv[2];

const buildClonePromisesForUser = (user) => {
  const promiseList = [];
  R.forEach((r) => {
    const promise = buildFolder(path, user)
      .then(newPath => clone(user, r, newPath)
        .then(() => newPath))
      .then(newPath => install(newPath, user, r))
      .catch(err =>
        console.log(`Failed for user ${user} repo ${r} with err: ${err.message}`));

    promiseList.push(promise);
  }, repos);
  return promiseList;
};

console.log('\n\n\nstarting process...');

const start = () => {
  const clonePromises = [];
  R.forEach((u) => {
    R.reduce((acc, p) => {
      acc.push(p);
      return acc;
    }, clonePromises, buildClonePromisesForUser(u));
  }, users);

  return Promise.all(clonePromises);
};

fse.stat(path)
  .then(() => start())
  .then(() => console.log('done'))
  .catch(err =>
    console.log('Path is probably not good, bro, but check this err: ', err));
