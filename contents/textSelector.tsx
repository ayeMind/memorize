import { createRoot } from "react-dom/client"

import IndexPopup from "~popup"

let selectedText = ""

document.addEventListener("selectionchange", function () {
  const popup = document.querySelector(".extension-icon-container-memorize")
  const icon = document.querySelector(".extension-icon-memorize")

  if (popup && !icon) {
    return
  }

  selectedText = window.getSelection().toString().trim()

  if (selectedText !== "") {

    const prevContainer = document.querySelector(
      ".extension-icon-container-memorize"
    )
    if (prevContainer) {
      prevContainer.remove()
    }

    const iconContainer = document.createElement("div")
    iconContainer.className = "extension-icon-container-memorize"

    const icon = document.createElement("button")
    icon.className = "extension-icon-memorize"
    icon.role = "button"
    icon.type = "button"
    icon.disabled = false

    const style = `
    .extension-icon-container-memorize {
        position: fixed !important;
        width: 22px;
        height: 22px;
        padding: 0px !important;
        margin: 0px !important;
        z-index: 1000000 !important;
        border: none !important;
        overflow: hidden !important;

    }

    .extension-icon-memorize {
        appearance: none !important;
        width: 22px !important;
        height: 22px !important;
        padding: 0px !important;
        margin: 0px !important;
        cursor: pointer !important;
        opacity: 100% !important;
        border: none !important;
        background-color: white !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    }

`

    const styleElement = document.createElement("style")
    styleElement.innerHTML = style
    document.head.appendChild(styleElement)

    icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" color="#000" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve" stroke="#8e00c2">
      <g id="SVGRepo_bgCarrier" stroke-width="0"/>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
      <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M462.863,95.24H270.286L241.455,7.197C240.049,2.904,236.042,0,231.524,0H49.137C22.043,0,0,22.043,0,49.138v318.478 c0,27.095,22.043,49.138,49.137,49.138h192.115l29.311,88.095c1.42,4.269,5.415,7.15,9.914,7.15h182.384 C489.957,512,512,489.957,512,462.862V144.38C512,117.285,489.957,95.24,462.863,95.24z M49.137,395.857 c-15.571,0-28.239-12.669-28.239-28.241V49.138c0-15.571,12.668-28.24,28.239-28.24h174.814l122.783,374.96H49.137z M350.458,286.536c4.473,6.841,9.853,14.435,16.206,22.461c-5.947,6.704-12.52,13.493-19.759,20.226l-28.768-87.852h8.273 C330.03,250.316,337.528,266.766,350.458,286.536z M349.192,241.371h62.165c-5.469,11.908-15.308,30.468-31.079,51.099 c-4.545-5.928-8.505-11.556-11.901-16.717C359.349,262.031,353.14,249.977,349.192,241.371z M263.278,416.755h75.328 l-54.084,63.85L263.278,416.755z M462.863,491.102H303.018l65.929-77.834c1.657-1.849,2.673-4.284,2.673-6.961 c0-1.378-0.266-2.695-0.751-3.9l-16.85-51.458c9.785-8.559,18.525-17.252,26.302-25.839 c17.544,19.367,40.485,39.927,69.799,57.876c1.703,1.043,3.586,1.539,5.446,1.539c3.516,0,6.951-1.775,8.921-4.994 c3.013-4.921,1.466-11.354-3.456-14.367c-28.471-17.434-50.493-37.492-67.082-56.152c23.199-29.342,35.285-55.429,40.202-67.64 h30.828c5.77,0,10.449-4.678,10.449-10.449c0-5.771-4.679-10.449-10.449-10.449h-74.907V202.71 c0-5.771-4.679-10.449-10.449-10.449c-5.77,0-10.449,4.678-10.449,10.449v17.763h-57.882l-34.165-104.335h185.734 c15.571,0,28.239,12.669,28.239,28.24v318.483h0.001C491.102,478.433,478.434,491.102,462.863,491.102z"/> </g> </g> <g> <g> <path d="M213.613,199.016h-59.202c-5.771,0-10.449,4.678-10.449,10.449c0,5.771,4.678,10.449,10.449,10.449h47.777 c-4.91,25.944-27.75,45.628-55.1,45.628c-30.921,0-56.077-25.156-56.077-56.077c0-30.921,25.156-56.077,56.077-56.077 c13.315,0,26.223,4.747,36.343,13.368c4.391,3.742,10.988,3.215,14.73-1.178c3.742-4.394,3.214-10.988-1.179-14.73 c-13.897-11.839-31.617-18.358-49.894-18.358c-42.444,0-76.974,34.531-76.974,76.974c-0.001,42.443,34.529,76.973,76.973,76.973 c42.444,0,76.974-34.531,76.974-76.975C224.062,203.695,219.384,199.016,213.613,199.016z"/> </g> </g> <g> <g> <path d="M201.622,351.434h-4.678c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h4.678 c5.77,0,10.449-4.678,10.449-10.449C212.071,356.112,207.392,351.434,201.622,351.434z"/> </g> </g> <g> <g> <path d="M163.141,351.434H61.649c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h101.492 c5.77,0,10.449-4.678,10.449-10.449C173.59,356.112,168.911,351.434,163.141,351.434z"/> </g> </g> </g>
    </svg>
   `

    const selectionRect = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect()

    iconContainer.style.top = selectionRect.top - 32 + "px"
    iconContainer.style.left = selectionRect.right + 16 + "px"

    iconContainer.appendChild(icon)
    document.body.appendChild(iconContainer)

    icon.addEventListener("click", function (event) {
      event.stopPropagation()
      icon.remove()
      const popupEvent = new Event("popup")
      document.dispatchEvent(popupEvent)
    })
  }
})

document.addEventListener("click", (e) => {
  const target = e.target as Node
  const popupContainer = document.querySelector(
    ".extension-icon-container-memorize"
  )

  const icon = document.querySelector(".extension-icon-memorize")

  if (target == popupContainer || popupContainer && popupContainer.contains(target)) {
    return
  } else if (selectedText && icon) {
    return
  } else if (popupContainer) {
    popupContainer.remove()
  } else if (icon) {
    icon.remove()
  }
})

document.addEventListener("popup", () => {
  const iconContainer = document.querySelector(
    ".extension-icon-container-memorize"
  ) as HTMLDivElement

  iconContainer.style.width = "auto"
  iconContainer.style.height = "auto"

    // depending on which is closer
    if (window.innerWidth - iconContainer.getBoundingClientRect().right < 400) {
        iconContainer.style.left = window.innerWidth - 400 + "px"
    } else {
        iconContainer.style.left = iconContainer.style.left
    }

    if (window.innerHeight - iconContainer.getBoundingClientRect().bottom < 624) {
        iconContainer.style.top = window.innerHeight - 624 + "px"
    } else {  
        iconContainer.style.top = iconContainer.style.top
    }

  localStorage.setItem("word", selectedText)
  const root = createRoot(iconContainer)
  root.render(<IndexPopup />)
})

export {}
