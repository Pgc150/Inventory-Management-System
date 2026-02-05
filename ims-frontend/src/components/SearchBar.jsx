import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className=''>
         <div className=''>
          <form>
            <div className='flex flex-row gap-5 items-center justify-center'>
                <div>
                  <input 
                  type='text'
                  placeholder='search by name'
                  className='bg-blue-50 p-4 rounded-2xl text-gray-100'
                  />
                </div>

                 <div className='flex'>
                    <select 
                    className='bg-blue-50 p-4 rounded-2xl'
                    >
                      <option>Select</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Grocessry</option>
                      <option>Food</option>
                    </select>
                 </div>
                 <div>
                  <input 
                   type='number'
                   placeholder='10'
                   className='bg-blue-50 p-4 rounded-2xl'
                  />
                 </div>
                 <div className=' flex gap-2 bg-blue-200 p-4 rounded-2xl'>
                    <button className=''>Search</button>
                    <Search/>
                    
                 </div>
            </div>
          </form>
         </div>
      </div>
  )
}

export default SearchBar