export {}

console.log('Second hello!');

document.addEventListener('selectionchange', function() {
    const selectedText = window.getSelection().toString().trim();

    // const icon = document.querySelector(".extension-icon-memorize");
    // if (icon) {
    //     icon.remove()
    // }

    if (selectedText !== '') {

        console.log(selectedText);
        

        const icon = document.createElement('button');
        icon.className = "extension-icon-memorize"
        icon.style.position = "absolute";
        icon.style.padding = "10px";
        icon.style.backgroundColor = "#FFFFFF";
        
        const selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        icon.style.top = (selectionRect.top + window.scrollY) + 'px';
        icon.style.left = (selectionRect.right + window.scrollX) + 'px';


        // const popup = document.createElement('div')
        // popup.className = "extension-icon-memorize";
        // popup.style.position = "absolute";
        // popup.style.padding = "20px";
        // popup.style.backgroundColor = "#FFFFFF";

        document.body.appendChild(icon);

        icon.addEventListener('click', function() {
            icon.disabled = true;
            // popup.style.top = icon.style.top;
            // popup.style.left = icon.style.left;

            // document.body.appendChild(popup)

            const event = new Event("popup")
            document.dispatchEvent(event)
        });
    }
});


