import Link from "next/link"

const NavBar = () => {
  return (
    <div id='navBar' className='flex-row bg-slate-200 text-lg hidden lg:block'>
      <ul className='flex flex-row p-2' id='navBarList'>
        <li>
          <Link className='px-2 hover:underline' href='/divisions'>
            Divisions
          </Link>
        </li>{" "}
        <li>
          <Link className='px-2 hover:underline' href='/conferences'>
            Conferences
          </Link>
        </li>
        <li>
          <Link
            href='/teams'
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
            Leaders
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
