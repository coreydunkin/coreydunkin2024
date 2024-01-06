
type RichTextProps = {
  text: string;
}

const RichText = ({ text }: RichTextProps) => {
  const textArray = text.split('\n').filter(paragraph => paragraph);
  const paragraphs = textArray.map((text, index) => {
    const htmlText = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
    return (
      <p key={index} className={`text-slate-600 ${index < textArray.length - 1 ? 'mb-5' : ''}`} dangerouslySetInnerHTML={{ __html: htmlText }} />
    );
  });

  return <>{paragraphs}</>;
}

export default RichText;