type HighlightedTextProps = {
    text: string;
  };
  
  const HighlightedText: React.FC<HighlightedTextProps> = ({ text }) => {
    return (
      <>
        {text.split(' ').map((word, index) => (
          <span
            key={index}
            className="inline-block bg-white text-black px-2 md:bg-transparent"
            style={{ wordSpacing: '-0.1em' }}
          >
            {word}{' '}
          </span>
        ))}
      </>
    );
  };
  
  export default HighlightedText;
  
  