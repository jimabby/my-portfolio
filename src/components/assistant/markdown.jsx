// A deliberately small Markdown subset for assistant replies. The model is
// prompted to stay within these constructs, and anything outside them degrades
// to plain text rather than leaking raw syntax at the visitor.
//
// This renders to React elements, never to HTML strings, so model output can
// never become markup — there is no dangerouslySetInnerHTML anywhere here.

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|__[^_]+__|\*[^*\n]+\*|_[^_\n]+_|`[^`\n]+`|\[[^\]\n]+\]\([^)\s]+\))/g;

const LINK_PATTERN = /^\[([^\]\n]+)\]\(([^)\s]+)\)$/;

// Only http(s), mailto and site-relative targets survive. Anything else
// (javascript:, data:, ...) is rendered as inert text.
const safeHref = (href) => {
  if (href.startsWith('/') || href.startsWith('#')) return href;
  try {
    const { protocol } = new URL(href);
    if (protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:') return href;
  } catch {
    return null;
  }
  return null;
};

const renderInline = (text, keyPrefix, onNavigate) => {
  const parts = text.split(INLINE_PATTERN).filter((part) => part !== '' && part !== undefined);

  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;

    const link = part.match(LINK_PATTERN);
    if (link) {
      const [, label, rawHref] = link;
      const href = safeHref(rawHref);
      if (!href) return <span key={key}>{label}</span>;

      const isInternal = href.startsWith('/') || href.startsWith('#');
      return (
        <a
          key={key}
          href={href}
          className="assistant__link"
          {...(isInternal
            ? { onClick: (e) => onNavigate?.(e, href) }
            : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {label}
        </a>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('__') && part.endsWith('__')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    if (
      (part.startsWith('*') && part.endsWith('*')) ||
      (part.startsWith('_') && part.endsWith('_'))
    ) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }

    return <span key={key}>{part}</span>;
  });
};

// Group the reply into paragraphs and lists, then render each line's inline
// spans. Blocks are emitted in source order so a partially streamed reply is
// always renderable.
export const renderMarkdown = (text, onNavigate) => {
  const lines = String(text ?? '').split('\n');
  const blocks = [];
  let paragraph = [];
  let list = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ type: 'p', lines: paragraph });
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    blocks.push(list);
    list = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      flushParagraph();
      flushList();
      continue;
    }

    const bullet = trimmed.match(/^[-*+]\s+(.*)$/);
    const numbered = trimmed.match(/^\d+[.)]\s+(.*)$/);

    if (bullet || numbered) {
      flushParagraph();
      const type = bullet ? 'ul' : 'ol';
      if (!list || list.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push((bullet || numbered)[1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();

  return blocks.map((block, i) => {
    if (block.type === 'p') {
      return (
        <p key={`b${i}`} className="assistant__message-text">
          {block.lines.map((line, j) => (
            <span key={`l${j}`}>
              {j > 0 && <br />}
              {renderInline(line, `b${i}-l${j}`, onNavigate)}
            </span>
          ))}
        </p>
      );
    }

    const List = block.type === 'ul' ? 'ul' : 'ol';
    return (
      <List key={`b${i}`} className="assistant__message-list">
        {block.items.map((item, j) => (
          <li key={`i${j}`}>{renderInline(item, `b${i}-i${j}`, onNavigate)}</li>
        ))}
      </List>
    );
  });
};

export default renderMarkdown;
