import fse from 'fs-extra';

const buildFolderForUser = async (basePath, user) => {
  const path = `${basePath}/${user}`;

  try {
    console.log('making dir ', path);
    await fse.mkdir(path);
    return path;
  } catch (e) {
    console.log('could not make dir ', path);
    throw e;
  }
};

export default buildFolderForUser;
