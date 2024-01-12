"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { GiHamburgerMenu } from "react-icons/gi"

import SearchBar from "./SearchBar"
import NavBar from "./NavBar"

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

          <div id='burgerMenu' className='lg:hidden m-2 p-2 pt-4'>
            <button
              id='burgerMenuButton'
              type='submit'
              className='flex flex-row align-middle justify-between'
              onClick={toggleMenu}
            >
              <GiHamburgerMenu className='h-8 w-8 cursor-pointer' />
              <p className=' text-2xl p-1 pt-0'>MENU</p>
            </button>
          </div>
        </div>
        {isMenuVisible && (
          <div
            id='navMenu'
            className='lg:hidden mt-2 px-2 border-y-2 border-slate-600'
          >
            <ul className='flex flex-col py-2' id='navMenuList'>
              <li>
                <Link
                  className='border-b-2 border-slate-400 hover:underline'
                  href='/#'
                >
                  Teams
                </Link>
              </li>
              <li>
                <Link
                  className='border-b-2 border-slate-400 hover:underline'
                  href='/#'
                >
                  Seasons
                </Link>
              </li>
              <li>
                <Link
                  className='border-b-2 border-slate-400 hover:underline'
                  href='/#'
                >
                  Conferences
                </Link>
              </li>
              <li>
                <Link
                  className='border-b-2 border-slate-400 hover:underline'
                  href='/#'
                >
                  Leaders
                </Link>
              </li>
            </ul>
          </div>
        )}
        <SearchBar />
      </div>
      <div
        id='navBar'
        className='flex-row bg-slate-200 text-lg hidden lg:block p-1 pl-2'
      >
        <NavBar />
      </div>
    </div>
  )
}

export default Header
