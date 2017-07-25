import fse from 'fs-extra';
import { GITHUB_BASE_URL } from './constants';
import exec from './utils/exec';

const cloneRepo = async (user, repo, path) => {
  const command = `git clone ${GITHUB_BASE_URL}${user}/${repo}`;
  const options = {
    cwd: path,
  };

  try {
    if (await fse.pathExists(`${path}/${repo}`)) {
      console.log(`skipping repo ${repo} for ${user} as it already exists!`);
      return;
    }
    console.log(`Starting git clone for ${user}/${repo}`);
    await exec(command, options);
    console.log(`Finished git clone for ${user}/${repo}`);
  } catch (e) {
    console.log(`Could not finish git clone for ${user}/${repo}`);
    throw e;
  }
};

export default cloneRepo;
