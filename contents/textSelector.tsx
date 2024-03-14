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
        icon.style.cursor = 'pointer';
        icon.role = 'button';     
        icon.type = 'button'; 
        icon.disabled = false;
        icon.style.opacity = '100%'


        icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="translate"><path d="M17 20H2.5A2.503 2.503 0 0 1 0 17.5v-15C0 1.122 1.122 0 2.5 0h8a.5.5 0 0 1 .473.338l6.5 19A.502.502 0 0 1 17 20zM2.5 1C1.673 1 1 1.673 1 2.5v15c0 .827.673 1.5 1.5 1.5h13.8L10.143 1H2.5z"></path><path d="M21.5 24h-8a.5.5 0 0 1-.468-.324l-1.5-4a.5.5 0 0 1 .936-.352L13.847 23H21.5c.827 0 1.5-.673 1.5-1.5v-15c0-.827-.673-1.5-1.5-1.5H12a.5.5 0 0 1 0-1h9.5C22.878 4 24 5.122 24 6.5v15c0 1.378-1.122 2.5-2.5 2.5z"></path><path d="M13.5 24a.5.5 0 0 1-.376-.83l3.5-4a.5.5 0 1 1 .753.659l-3.5 4A.502.502 0 0 1 13.5 24zM9.5 14a.499.499 0 0 1-.471-.332L7 7.987l-2.029 5.681a.5.5 0 0 1-.942-.336l2.5-7c.142-.398.8-.398.941 0l2.5 7A.5.5 0 0 1 9.5 14z"></path><path d="M8 11H6a.5.5 0 0 1 0-1h2a.5.5 0 0 1 0 1zM21.5 11h-7a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1z"></path><path d="M17.5 11a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5zM16 17a.498.498 0 0 1-.29-.907c2.189-1.555 3.79-4.727 3.79-5.592a.5.5 0 0 1 1 0c0 1.318-1.927 4.785-4.21 6.408A.507.507 0 0 1 16 17z"></path><path d="M20 18a.494.494 0 0 1-.337-.131c-.363-.332-3.558-3.283-4.126-4.681a.5.5 0 0 1 .926-.376c.409 1.007 2.936 3.459 3.875 4.319A.5.5 0 0 1 20 18z"></path></svg>
        `
        

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