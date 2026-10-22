import { expect, test } from 'claude-code/testing'

const BAND = {
  plugin: 'usage-band',
  component: 'AbovePrompt',
  props: {
    hasSurvey: false,
    isWorking: false,
    maxRows: 10,
    bodyColumns: 80,
    scroll: { offset: 0, bodyRows: 9 },
    view: {},
  },
} as const

const USAGE = {
  startedAt: 0,
  context: { tokens: 62000, window: 200000, percent: 31 },
  rateLimits: [
    { kind: 'five_hour', percentUsed: 42, resetsAt: '2026-10-22T14:00:00Z' },
    { kind: 'seven_day', percentUsed: 18 },
  ],
  cost: { usd: 1.2 },
}

const ROW = /^5-hour 42% \(resets \d\d:\d\d\)  ·  Weekly 18%  ·  Context 31%  ·  Session \$1\.20$/

test('draws the usage row above the prompt on terminal and desktop', async ($, on) => {
  on('session.usage', () => ({ value: USAGE }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...BAND, surface })
    const row = await ui.find({ type: 'Text', text: /5-hour/ })
    expect(row?.text).toMatch(ROW)
    await ui.unmount()
  }
})

test('follows the engine when it measures the session', async ($, on) => {
  on('session.usage', () => ({ value: USAGE }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('session.measure', (_, e) => ({ changed: e.changed }))

  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  await $.session.measure({
    context: { window: 200000, percent: 55 },
    rateLimits: [{ kind: 'five_hour', percentUsed: 91 }],
    cost: { usd: 2.5 },
    changed: ['context', 'rateLimits', 'cost'],
  })

  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  const row = await ui.find({ type: 'Text', text: /5-hour/ })
  expect(row?.text).toBe('5-hour 91%  ·  Context 55%  ·  Session $2.50')
  await ui.unmount()
})

test('yields the band to a survey', async ($, on) => {
  on('session.usage', () => ({ value: USAGE }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>survey</Text>
  })

  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  const ui = await $.ui.mount({ ...BAND, surface: 'terminal', props: { ...BAND.props, hasSurvey: true } })
  expect((await ui.find({ type: 'Text', text: /survey/ }))?.text).toBe('survey')
  expect(await ui.find({ type: 'Text', text: /5-hour/ })).toBe(undefined)
  await ui.unmount()
})
