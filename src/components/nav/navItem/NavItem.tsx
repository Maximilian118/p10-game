import React from "react"
import "./_navItem.scss"

interface navItemProps {
  item: {
    text: string,
    url: string,
    index: number,
  },
  setValue: Function,
  style?: object,
}

const NavItem: React.FC<navItemProps> = ({ item, style, setValue }) => {
  const createRipple = (e: React.MouseEvent<HTMLElement>, navPos: DOMRect): void => {
    const item = e.currentTarget

    const circle = document.createElement("span")
    const diameter = Math.max(item.clientWidth, item.clientHeight)
    const radius = diameter / 2

    circle.addEventListener('animationend', () => item.removeChild(circle))

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.pageX - (item.offsetLeft + radius) - navPos.left}px`
    circle.style.top = `${e.pageY - (item.offsetTop + radius) - navPos.top}px`
    circle.classList.add("ripple")

    item.appendChild(circle)
  }

  const onClickHandler = (e: React.MouseEvent<HTMLElement>, setValue: Function): void => {
    const navPos = document.getElementsByTagName("nav")[0].getBoundingClientRect()
    const leftPos = e.currentTarget.getBoundingClientRect().left

    createRipple(e, navPos)

    setValue({
      index: item.index,
      itemWidth: e.currentTarget.clientWidth,
      leftPosition: leftPos - navPos.left,
    })
  }

  return (
    <div className="nav-item" style={style} onClick={e => onClickHandler(e, setValue)}>
      <p>{item.text}</p>
    </div>
  )
} 

export default NavItem
