import Link from "next/link"

const NavBar = () => {
  return (
    <div>
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
  )
}

export default NavBar
