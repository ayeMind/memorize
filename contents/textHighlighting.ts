export {}

console.log('Hello!');
const page = document.querySelector('body');
const text = page.innerHTML;

const highlightWord = (word: string) => {
    const regex = new RegExp(`\\b(${word})\\b`, 'g');
    if (regex.test(text)) {
        const newText = text.replace(regex, "<span class='extension-word-memorize'>$1</span>");
        page.innerHTML = newText;
    }
}

highlightWord("classes")


const style = `
    .extension-word-memorize {
        text-shadow: 1px 1px #ffe2e7;
        cursor: pointer;
    }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = style;
document.head.appendChild(styleElement);