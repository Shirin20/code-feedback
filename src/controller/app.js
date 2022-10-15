/* eslint-disable jsdoc/require-jsdoc */

import readline from 'readline'
import { ProgramActions } from '../model/ProgramActions.js'
import { UserConsole } from '../view/UserConsole.js'

const userActions = new ProgramActions()
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
        await userActions.cloneProject(inputLineArray[1])
        break
      case 'report':
        reportObject = await userActions.getReport(inputLineArray[1])
        cli.printReport(reportObject)
        break
      case 'feedback':
        userActions.writePersistentFeedbackToFile(inputLineArray)
        break
      case 'delete':
        await userActions.deleteStudentProject(inputLineArray[1])
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
