import Link from "next/link"

const NavMenu = () => {
  return (
    <div
      id='navMenu'
      className='lg:hidden mt-2 px-2 border-y-2 border-slate-600'
    >
      <ul className='flex flex-col py-2' id='navMenuList'>
        <li>
          <Link
            className='border-b-2 border-slate-400 hover:underline'
            href='/divisions'
          >
            Divisions
          </Link>
        </li>
        <li>
          <Link
            className='border-b-2 border-slate-400 hover:underline'
            href='/conferences'
          >
            Conferences
          </Link>
        </li>
        <li>
          <Link
            className='border-b-2 border-slate-400 hover:underline'
            href='/teams'
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
            Leaders
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavMenu
