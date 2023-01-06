declare class ApplicationConfig {
  filePath: string
  read(): Promise<unknown>
  write(data: object): Promise<void>
  trash(): Promise<void>
}

export default function createApplicationConfig (mame: String): ApplicationConfig
