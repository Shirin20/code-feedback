/* eslint-disable promise/param-names */
/* eslint-disable jsdoc/require-jsdoc */
import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

export class UserConsole {
  async welcome () {
    const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))
    const rainbowTitle = chalkAnimation.rainbow(
      '                    Student project reports \n'
    )

    await sleep()
    rainbowTitle.stop()

    console.log(`
    ${chalk.bgBlue('How to use the program')} 
    Start by entering the name of the student and the name of the project
    check a report on the project code 
    write a feedback to the student 
    Then student name, project name, report and feedback
    will be saved in the ${chalk.bgRed('report.text')} file
 `)
  }

  async askName () {
    const answers = await inquirer.prompt({
      name: 'student_name',
      type: 'input',
      message: 'Student full name?',
      default () {
        return 'firstName lastName'
      }
    })
    const studentName = answers.student_name
    return studentName
  }

  async askProjectName () {
    const answers = await inquirer.prompt({
      name: 'project_name',
      type: 'input',
      message: 'project?',
      default () {
        return 'projectName'
      }
    })
    const projectName = answers.project_name
    return projectName
  }

  async askGitHubUrl () {
    const answers = await inquirer.prompt({
      name: 'github_url',
      type: 'input',
      message: 'Please write the git hup url to clone the project',
      default () {
        return 'Github url'
      }
    })
    const gitHubUrl = answers.github_url
    return gitHubUrl
  }

  async askIfToPrintReport () {
    const answers = await inquirer.prompt({
      name: 'print_report',
      type: 'confirm',
      message: 'do you want to print the report',
      default () {
        return 'Y/N'
      }
    })
    const printReport = answers.print_report
    return printReport
  }
}
