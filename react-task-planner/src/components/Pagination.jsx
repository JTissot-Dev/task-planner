import { PreviousIcon } from "./icons";
import { NextIcon } from "./icons";
import { useState } from "react";
import { useEffect } from "react";

const Pagination = ({ pagination, updateProjects, loading }) => {

  const [pageItems, setPageItems] = useState({
    first: null,
    last: null
  });

  useEffect(() => {
      if (pagination.length > 0 && pageItems.first < 6) {
        setPageItems({
          first: 1,
          last: pagination.length <= 6 ? pagination.length -2: 5
        });
      }
    }, [pagination])

  const pages = pagination.map((page, index) => {
    
    if (pagination.length > 0) {
      if (index >= pageItems.first && index <= pageItems.last) {
        return (
          <li key={ index }>
            <button
              className={ `flex items-center justify-center px-4 h-10 leading-tight ${page.active ? "text-purple-500 transition duration-200 hover:ease-in-out bg-slate-800 border border-purple-400 hover:bg-purple-500 hover:bg-opacity-30 hover:text-purple-400" : "bg-slate-950 text-zinc-50 text-opacity-90 border border-zinc-50 border-opacity-60 transition duration-200 hover:ease-in-out hover:bg-slate-800"}` }
              onClick={() => updateProjects(page.label)}
            >
                { page.label }
            </button>
          </li>
        )
      }
    }
  })


  const handlePreviousPages = () => {
    if (pageItems.last > 5) {
      const lastPage = (pageItems.first -6) + 5
      setPageItems({
        first: pageItems.first -5,
        last: lastPage
      })
      updateProjects(lastPage);
      console.log(pagination);
    }
  }

  const handleNextPages = () => {
    if (pageItems.last < pagination.length -2) {
      const firstPage = pageItems.first + 5
      setPageItems({
        first: firstPage,
        last: pageItems.last + 5 < pagination.length -1 ? pageItems.last + 5 : pagination.length -2
      })
      updateProjects(firstPage);
    }
  }

  
  return (
    <nav 
      aria-label="Page navigation example"
      className={loading || pagination.length <= 3 ? "hidden" : ""}
    >
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <button 
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight bg-slate-950 border border-zinc-50 border-opacity-60 rounded-l-lg transition duration-200 hover:ease-in-out hover:bg-slate-800"
            onClick={ handlePreviousPages }
          >
            <PreviousIcon />
          </button>
        </li>
        { pages }
        <li>
          <button 
            className="flex items-center justify-center px-4 h-10 leading-tight bg-slate-950 border border-zinc-50 border-opacity-60 rounded-r-lg transition duration-200 hover:ease-in-out hover:bg-slate-800"
            onClick={ handleNextPages }
          >
            <NextIcon />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;