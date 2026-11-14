import { api } from '../api.ts'
import { h } from '../dom.ts'
import { plural } from '../format.ts'
import { type Instrument, onlyFiltered } from '../instrument.ts'
import { empty, foot, identity, section, table, viewHeader } from '../ui.ts'

export const library: Instrument = {
  id: 'library',
  job: 'observe',
  title: 'Library',
  glyph: 'library',
  summary: 'The Knowledge Bases and project documents in scope, read-only',
  filters: true,
  async render(context) {
    const [bases, documents] = await Promise.all([
      api.knowledgeBases(context.state.scope),
      api.documents(context.state.scope)
    ])
    const baseRows = bases.ok ? onlyFiltered(context, bases.data.bases, (b) => b.identity) : []
    const docRows = documents.ok ? onlyFiltered(context, documents.data.repositories, (d) => d.identity) : []
    return h(
      'div',
      { class: 'view' },
      viewHeader(
        'library',
        'Library',
        `${plural(baseRows.length, 'Knowledge Base')} · ${plural(docRows.length, 'project')} with documents`
      ),
      h(
        'div',
        { class: 'columns' },
        section(
          'Knowledge Bases',
          bases.ok
            ? table(
                [...baseRows].sort((a, b) => a.title.localeCompare(b.title)),
                [
                  { label: 'Knowledge Base', cell: (b) => h('span', { class: 'ink' }, b.title) },
                  { label: 'Repository', width: '55%', cell: (b) => identity(b.identity) }
                ],
                { caption: 'Knowledge Bases' }
              )
            : empty('Knowledge Bases were not read.', bases.reason),
          foot('By title. Reads /api/knowledge-bases; zones and notes open in the Observatory.')
        ),
        section(
          'Project documents',
          documents.ok
            ? table(
                [...docRows].sort((a, b) => a.identity.localeCompare(b.identity)),
                [{ label: 'Repository', cell: (d) => identity(d.identity) }],
                { caption: 'Repositories with documents' }
              )
            : empty('Documents were not read.', documents.reason),
          foot('By repository. Reads /api/documents: READMEs, guides, specifications, records and diagrams.')
        )
      )
    )
  }
}
