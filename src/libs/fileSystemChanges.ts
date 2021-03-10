import index = require("./../backend/index")
import { io } from '../Socket/io'
import fs from 'fs'


export class FileSystemChangeDetectedEmit {

  private readonly path: string
  private contentBefore: string = ""

  constructor(path: string) {
    this.path = path
  }

  public async listenChanges() {
    this.contentBefore = await this.readContentFile()
    await fs.watch(this.path, this.onChangeFile.bind(this));
  }

  private async onChangeFile(eventType: string, filename: string) {
    try {
      const currentContent = await this.readContentFile();
      const equal = currentContent.trim() == this.contentBefore.trim() ? true : false
      if (equal) { return }
      const objectChange = this.detectedChanges(currentContent)
      this.contentBefore = currentContent
      console.log("Emitiendo cambios detectados: ", objectChange)
      io.emit("fileChange", objectChange)

    } catch (error) { console.log(error, module.filename) }
  }

  private getMatriz(stringFile: string) {
    try {
      const matriz: [string[]] = [[]]
      const filas = stringFile.trim().split(/\r?\n/)
      filas.forEach((fila, indexRow) => {
        const columnas = fila.split(",")
        matriz[indexRow] = []
        columnas.forEach((columna, indexColumn) => {
          matriz[indexRow][indexColumn] = columna
        })
      })
      return matriz
    } catch (error) { throw error }
  }

  private detectedChanges(currentContent: string) {
    const current = this.getMatriz(currentContent)
    const before = this.getMatriz(this.contentBefore)
    let objectChange = {
      current,
      before
    }
    return objectChange
  }
  private readContentFile(): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) { reject(err) }
        resolve(data);
      })
    });
  }

}

