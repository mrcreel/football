import { AiOutlineSearch } from "react-icons/ai"

const SearchBar = () => {
  return (
    <div className='flex-grow p1 mt-1'>
      <form
        id='searchForm'
        action=''
        className='flex flex-row h-10 px-1 lg:mt-4 mt-2 rounded-md border-2 border-slate-300 align-middle justify-between bg-white flex-grow '
      >
        <input
          type='text'
          name='searchInput'
          id='searchInput'
          required
          placeholder='Search for a team, year, or conference'
          className='h-8 text-lg align-middle flex-1 focus:outline-none'
        />
        <button type='submit' aria-label='searchButton'>
          <AiOutlineSearch className=' h-8 w-8 ' />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
