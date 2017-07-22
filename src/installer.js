import exec from './utils/exec';

const install = async (path, user, repo) => {
  const fullPath = `${path}/${user}/${repo}`;
  const command = 'npm i';

  try {
    console.log('running npm install in ', fullPath);
    await exec(command, {
      cdw: fullPath,
    });
    console.log('finished running npm install in ', fullPath);
  } catch (e) {
    console.log('Could not finish npm install in ', fullPath);
    throw e;
  }
};

export default install;
