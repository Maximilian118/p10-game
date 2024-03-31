import React from "react"

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
  const onClickHandler = (e: React.MouseEvent<HTMLElement>, setValue: Function) => {
    const navLeft = document.getElementsByTagName("nav")[0].getBoundingClientRect().left
    const leftPos = e.currentTarget.getBoundingClientRect().left

    setValue({
      index: item.index,
      itemWidth: e.currentTarget.clientWidth,
      leftPosition: leftPos - navLeft,
    })
  }

  return (
    <div className="nav-item" style={style} onClick={e => onClickHandler(e, setValue)}>
      <p>{item.text}</p>
    </div>
  )
} 

export default NavItem
