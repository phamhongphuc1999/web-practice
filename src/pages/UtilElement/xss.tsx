import DOMPurify from 'dompurify';

const __html = '<div>Dangerous HTML</div>';

export default function XSS() {
  return (
    <div className="mt-4">
      <div dangerouslySetInnerHTML={{ __html }} />
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(__html) }} />
    </div>
  );
}
