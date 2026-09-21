import { LinkExternalIcon } from '@primer/octicons-react'
import { sources, verifiedDate } from '../assessment/questions'

export function SourceIndex() {
  return (
    <section className="source-index" id="sources" aria-labelledby="sources-title">
      <div className="section-heading">
        <div>
          <h2 id="sources-title">Public source index</h2>
        </div>
        <p>
          Product behavior changes. Claims and links were last reviewed on{' '}
          <time dateTime={verifiedDate}>{verifiedDate}</time>.
        </p>
      </div>
      <div className="source-table">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{source.category}</span>
            <strong>{source.title}</strong>
            <LinkExternalIcon />
          </a>
        ))}
      </div>
    </section>
  )
}
