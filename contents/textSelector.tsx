import IndexPopup from "~popup";
import { createRoot } from "react-dom/client"

let selectedText = '';

document.addEventListener('selectionchange', function() {
    selectedText = window.getSelection().toString().trim();

    // const icon = document.querySelector(".extension-icon-memorize");
    // if (icon) {
    //     icon.remove()
    // }

    if (selectedText !== '') {

        console.log(selectedText);

        const prevContainer = document.querySelector('.extension-icon-container-memorize');
        if (prevContainer) {
            prevContainer.remove();
        }
        
        const iconContainer = document.createElement('div');
        iconContainer.className = "extension-icon-container-memorize"
        iconContainer.style.position = "fixed";
        iconContainer.style.width = "20px";
        iconContainer.style.height = "20px";
        iconContainer.style.padding = "0px";
        iconContainer.style.margin = "0px";
        iconContainer.style.backgroundColor = "#FFFFFF";


        const icon = document.createElement('button');
        icon.style.appearance = 'none';
        icon.className = "extension-icon-memorize";
        icon.style.width = "20px";
        icon.style.height = "20px";
        icon.style.padding = "0px";
        icon.style.margin = "0px";
        icon.style.backgroundColor = "#ff323f";
        icon.style.cursor = 'pointer';
        icon.role = 'button';     
        icon.type = 'button'; 
        icon.disabled = false;
    

        const selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        iconContainer.style.top = selectionRect.top + 'px';
        iconContainer.style.left = selectionRect.right + 'px';

     


        // const popup = document.createElement('div')
        // popup.className = "extension-icon-memorize";
        // popup.style.position = "absolute";
        // popup.style.padding = "20px";
        // popup.style.backgroundColor = "#FFFFFF";

        iconContainer.appendChild(icon);
        document.body.appendChild(iconContainer);

        icon.addEventListener('click', function() {
            icon.remove()
            // popup.style.top = icon.style.top;
            // popup.style.left = icon.style.left;

            // document.body.appendChild(popup)

            const event = new Event("popup")
            document.dispatchEvent(event)
    
        });
    }
});


document.addEventListener("popup", ()=>{
    console.log("popup!");
    const iconContainer = document.querySelector(".extension-icon-container-memorize") as HTMLDivElement
  
    iconContainer.style.width="auto"
    iconContainer.style.height="auto"

    localStorage.setItem("word", selectedText)
    const root = createRoot(iconContainer)
    root.render(<IndexPopup />)
})

export {}