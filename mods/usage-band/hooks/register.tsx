import { atom, read, update } from 'claude-code'
import type { Register, SessionRateLimit, SessionContextUsage, SessionCost } from 'claude-code'

import type { Usage } from '../types'

const usage = atom({ plugin: 'usage-band', key: 'usage' } as const, null)

function toUsage(rateLimits: SessionRateLimit[], context: SessionContextUsage, cost?: SessionCost): Usage {
  const fiveHour = rateLimits.find(r => r.kind === 'five_hour')
  const sevenDay = rateLimits.find(r => r.kind === 'seven_day')

  return {
    fiveHour: fiveHour?.percentUsed ?? null,
    sevenDay: sevenDay?.percentUsed ?? null,
    fiveHourResetsAt: fiveHour?.resetsAt ?? null,
    context: context.percent ?? null,
    usd: cost?.usd ?? null,
  }
}

function resetLabel(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return ` (resets ${hh}:${mm})`
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const u = await $.session.usage()
    await update($, usage, () => toUsage(u.rateLimits, u.context, u.cost))
    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    await update($, usage, () => toUsage(e.rateLimits, e.context, e.cost))
    if (e.changed.includes('rateLimits')) {
      const hot = e.rateLimits.find(r => r.percentUsed >= 90)
      if (hot) $.ui.toast(`${hot.kind.replace('_', '-')} limit at ${hot.percentUsed}%`)
    }
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const u = await read($, usage)
    if (e.props.hasSurvey || u === null) return next(e)

    const { Box, Text } = $.ui.resolve(e)
    const parts: string[] = []
    if (u.fiveHour !== null) parts.push(`5-hour ${u.fiveHour}%${resetLabel(u.fiveHourResetsAt)}`)
    if (u.sevenDay !== null) parts.push(`Weekly ${u.sevenDay}%`)
    if (u.context !== null) parts.push(`Context ${u.context}%`)
    if (u.usd !== null) parts.push(`Session $${u.usd.toFixed(2)}`)
    if (parts.length === 0) return next(e)

    return (
      <Box>
        <Text dimColor>{parts.join('  ·  ')}</Text>
      </Box>
    )
  })
}
