interface Paragraph {
    text: string[];
    style: string[]
}

export function buildParagraph(paragraph: Paragraph, className: string, index: number) {
    return (
        <p className={className} key={index}>
            {paragraph.text.map((text, index) => {
                if (paragraph.style[index] === "") {
                    return text + " "; // Add a space after each text
                } else {
                    return (<><span key={index} className={paragraph.style[index]}>{text}</span>{' '}</>); // Add a space after each text within a span
                }
            })}
        </p>
    )
}