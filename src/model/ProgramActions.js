/* eslint-disable jsdoc/require-jsdoc */
import { ProjectCodeChecker } from 'code-statistics/src/ProjectCodeChecker.js'
import { ProjectFilesReader } from 'code-statistics/src/ProjectFilesReader.js'

const projectFiles = new ProjectCodeChecker()
const projectReader = new ProjectFilesReader()

export class ProgramActions {
  async getReport (projectRootPath) {
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
