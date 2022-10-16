/* eslint-disable jsdoc/require-jsdoc */

import readline from 'readline'
import { Reporter } from '../model/Reporter.js'
import { GithubProject } from '../model/GithubProject.js'
import { UserConsole } from '../view/UserConsole.js'

const codeReport = new Reporter()
const studentProject = new GithubProject()
const cli = new UserConsole()

async function runProgram () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  cli.showMenu()

  rl.setPrompt('Your choice: ')
  rl.prompt()

  rl.on('close', exitProgram)
  rl.on('line', async (input) => {
    input = input.trim()
    const inputLineArray = input.split(' ')
    let reportObject

    switch (inputLineArray[0]) {
      case 'exit':
      case 'quit':
        exitProgram()
        break
      case 'menu':
      case 'help':
        cli.showMenu()
        break
      case 'clone':
        await studentProject.cloneStudentProject(inputLineArray[1])
        break
      case 'report':
        reportObject = await codeReport.getReport(inputLineArray[1])
        cli.printReport(reportObject)
        break
      case 'feedback':
        codeReport.writePersistentFeedbackToFile(inputLineArray)
        break
      case 'delete':
        await studentProject.deleteStudentProject(inputLineArray[1])
        break
      default:
        cli.showMenu()
        break
    }
    rl.prompt()
  })
}

function exitProgram (code) {
  code = code || 0

  console.info('\nExiting with exit status: ' + code)
  process.exit(code)
}

runProgram()
