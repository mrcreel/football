"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import SearchBar from "./SearchBar"
import NavBar from "./NavBar"
import NavMenu from "./NavMenu"
import BurgerMenu from "./BurgerMenu"

const Header = () => {
  const [isMenuVisible, setMenuVisible] = useState(false)
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible)
  }

  return (
    <div id='header' role='banner' className='flex flex-col py-2 text-black'>
      <div className='flex flex-col lg:flex-row bg-white align-middle'>
        <div className='flex flex-row pl-1 justify-between align-middle'>
          <div id='logo' className='p-1 flex items-center justify-center'>
            <Link href='/'>
              <Image src='/logo.png' alt='Logo' width={250} height={100} />
            </Link>
          </div>
          <BurgerMenu onClick={toggleMenu} />
        </div>
        {isMenuVisible && <NavMenu />}
        <SearchBar />
      </div>
      <NavBar />
    </div>
  )
}

export default Header
