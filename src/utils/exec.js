import cp from 'child_process';

const exec = (command, options) => new Promise((resolve, reject) => {
  const process = cp.exec(command, options, (err, stdout, stdin) => {
    if (err) {
      return reject(err);
    }

    return resolve({ process, stdin, stdout });
  });
});

export default exec;
