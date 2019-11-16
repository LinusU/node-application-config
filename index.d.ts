declare class ApplicationConfig {
  filePath: string
  read(): Promise<unknown>
  write(data: object): Promise<void>
  trash(): Promise<void>
}

declare function createApplicationConfig (mame: String): ApplicationConfig
export = createApplicationConfig
