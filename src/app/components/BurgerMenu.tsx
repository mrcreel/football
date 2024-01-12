import { useState } from "react"

import { GiHamburgerMenu } from "react-icons/gi"

interface Props {
  onClick: () => void
}

const BurgerMenu = ({ onClick }: Props) => {
  const [isMenuVisible, setMenuVisible] = useState(false)
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible)
  }
  return (
    <div id='burgerMenu' className='lg:hidden m-2 p-2 pt-4'>
      <button
        id='burgerMenuButton'
        type='submit'
        className='flex flex-row align-middle justify-between'
        onClick={onClick}
      >
        <GiHamburgerMenu
          id='burgerMenuIcon'
          className='h-8 w-8 cursor-pointer'
        />
        <p className=' text-2xl p-1 pt-0'>MENU</p>
      </button>
    </div>
  )
}

export default BurgerMenu
