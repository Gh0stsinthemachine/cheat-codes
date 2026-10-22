export type Usage = {
  fiveHour: number | null
  sevenDay: number | null
  fiveHourResetsAt: string | null
  context: number | null
  usd: number | null
}

declare module 'claude-code' {
  interface PluginState {
    'usage-band': { usage: Usage | null }
  }
}
