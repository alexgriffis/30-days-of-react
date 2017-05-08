process.env.NODE_ENC = 'test'

var chalk = require('chalk')
const exec = require('child_process').exec

var output = []
function runCmd (cmd) {
  return new Promise((resolve, reject) => {
    const testProcess = exec(cmd, { stdio: [0, 1, 2] })
    testProcess.stdout.on('data', (msg) => output.push(msg))
    testProcess.stderr.on('data', (msg) => output.push(msg))
    testProcess.on('close', (code) => (code === 0) ? resolve() : reject())
  })
}

function build () {
  console.log(chalk.cyan('building app'))
  return runCmd('npm run build')
}

function runTests () {
  console.log(chalk.cyan('running tests'))
  return runCmd('npm test')
}

function deploy () {
  console.log(chalk.green('deploying app'))
  return runCmd(`sh -c "${__dirname}/deploy.sh"`)
}

function error () {
  console.log(chalk.red('error during release'))
  output.forEach(msg => process.stdout.write(msg))
}

build()
  .then(runTests)
  .then(deploy)
  .catch(error)
