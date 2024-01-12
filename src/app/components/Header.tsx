"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineSearch } from "react-icons/ai"

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
              <Image src='/logo_md.png' alt='Logo' width={250} height={100} />
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
        <div id='search' className='flex-grow m-1 p-1'>
          <form
            id='searchForm'
            action=''
            className='flex flex-row h-10 p-1 mt-2 rounded-md border-2 border-slate-300 align-middle justify-between bg-white flex-grow '
          >
            <input
              type='text'
              name='search'
              id='search'
              required
              placeholder='Search for a team, year, or conference'
              className='h-8 text-lg align-middle flex-1 focus:outline-none'
            />
            <button type='submit'>
              <AiOutlineSearch className=' h-8 w-8 ' />
            </button>
          </form>
        </div>
      </div>
      <div
        id='navBar'
        className='flex-row bg-slate-200 text-lg hidden lg:block'
      >
        <ul className='flex flex-row' id='navBarList'>
          <li>
            <Link
              href='/'
              className='px-2 pl-0 hover:underline hover:underline-offset-1 '
            >
              Teams
            </Link>
          </li>
          <li>
            <Link className='px-2 hover:underline' href='/#'>
              Seasons
            </Link>
          </li>
          <li>
            <Link className='px-2 hover:underline' href='/#'>
              Conferences
            </Link>
          </li>
          <li>
            <Link className='px-2 hover:underline' href='/#'>
              Leaders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
