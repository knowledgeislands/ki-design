import type { Instrument } from './instrument.ts'
import { type InstrumentId, type Job, remember, remembered } from './state.ts'
import { beacon } from './views/beacon.ts'
import { council } from './views/council.ts'
import { createExtensions } from './views/extensions.ts'
import { lands } from './views/lands.ts'
import { library } from './views/library.ts'
import { machine } from './views/machine.ts'
import { repositories } from './views/repositories.ts'
import { streams } from './views/streams.ts'
import { waiting } from './views/waiting.ts'
import { workers } from './views/workers.ts'

/** Instruments the switchboard cannot turn off. */
export const PERMANENT = new Set<InstrumentId>(['beacon', 'extensions'])

const disabled = new Set<InstrumentId>(remembered<InstrumentId[]>('extensions.disabled', []))

export const isEnabled = (id: InstrumentId): boolean => PERMANENT.has(id) || !disabled.has(id)

/** The restructured instrument set, in the order the tabs show them. */
export const instruments: Instrument[] = [
  beacon,
  waiting,
  lands,
  library,
  council,
  streams,
  workers,
  repositories,
  machine,
  createExtensions({ instruments: () => instruments, permanent: PERMANENT, isEnabled, setEnabled })
]

export const JOB_LABEL: Record<Job, string> = { observe: 'Observe', attend: 'Attend', act: 'Act', extend: 'Extend' }

export const byId = (id: InstrumentId): Instrument => instruments.find((i) => i.id === id) ?? beacon

export function setEnabled(id: InstrumentId, on: boolean): void {
  if (on) disabled.delete(id)
  else disabled.add(id)
  remember('extensions.disabled', [...disabled])
}

export const instrumentsFor = (job: Job): Instrument[] => instruments.filter((i) => i.job === job && isEnabled(i.id))
