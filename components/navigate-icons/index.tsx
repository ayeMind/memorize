import { IconCards, IconSettings } from "@tabler/icons-react"

export const NavigateIcons = () => {
  return (
    <div className="absolute flex flex-col gap-1 memorize right-2 top-2">
      <button
        className="cursor-pointer memorize btn-reset"
        onClick={() => chrome.runtime.sendMessage("showOptions")}>
        <IconSettings
          size={32}
          color="#fff"
          className="border-0 svg-reset fill-none"
        />
      </button>
      <button
        className="cursor-pointer memorize btn-reset"
        onClick={() => chrome.runtime.sendMessage("showCards")}>
        <IconCards
          size={32}
          color="#fff"
          className="border-0 svg-reset fill-none"
        />
      </button>
    </div>
  )
}
