import "index.css"
import IndexPopup from "~popup";
import { createRoot } from "react-dom/client"

document.addEventListener("popup", ()=>{
    console.log("popup!");
    const icon = document.querySelector(".extension-icon-memorize") as HTMLDivElement

    const root = createRoot(icon)
    root.render(<IndexPopup />)
})

export {}


