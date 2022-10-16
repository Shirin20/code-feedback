/* eslint-disable jsdoc/require-jsdoc */
import { ProjectCodeChecker } from 'code-statistics/src/ProjectCodeChecker.js'
import { ProjectFilesReader } from 'code-statistics/src/ProjectFilesReader.js'
import { ErrorHandler } from './ErrorHandler.js'

const projectFiles = new ProjectCodeChecker()
const projectReader = new ProjectFilesReader()
const errorChecker = new ErrorHandler()

export class Reporter {
  async getReport (projectRootPath) {
    errorChecker.handleProjectRootPathError(projectRootPath)

    const projectFilesArray = await projectReader.getDirectoryFilesPaths(projectRootPath)

    const reportObj = {
      projectLines: await projectFiles.countProjectLines(projectFilesArray),

      projectIfStatements: await projectFiles.countProjectIfStatements(projectFilesArray),

      projectLinesForLoops: await projectFiles.countProjectForLoops(projectFilesArray),

      projectsCharacters: await projectFiles.countProjectCharacters(projectFilesArray)
    }

    return reportObj
  }
}
