import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './action/actionCreator';
import JobCard from './components/JobCard';
import FilterSection from './components/FilterSection';

function App() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState([]);
  const previousScrollY = useRef(0); //whenever the api gets called , this is getting set to 0.so going back to top again
  const debounceTimeout = useRef(null);
  

  useEffect(() => {
    // Fetch initial data when component mounts
    dispatch(fetchData(offset));  //api is getting called 2 times when the page first laods.
    console.log(offset,"in")
  }, [dispatch,offset]);

  // const handleScroll = () => {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //     // Increment offset and fetch more data
  //     setOffset(prevOffset => prevOffset + 1); // Assuming limit is 10
  //   }

  //   // Store current scroll position
  //   previousScrollY.current = window.scrollY;
  // };

  const handleScroll = () => {
    // Clear the previous debounce timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Debounce the API call
    debounceTimeout.current = setTimeout(() => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // Increment offset and fetch more data
        setOffset(prevOffset => prevOffset + 10); // Assuming limit is 10
      }
     
      // Store current scroll position

      console.log(window.scrollY, "y check")

      previousScrollY.current = window.scrollY;
      // window.scrollTo(0, previousScrollY.current);
      console.log(previousScrollY.current, debounceTimeout)
    }, 200); // Adjust debounce delay as needed
  };

  // Attach scroll event listener when component mounts
  useEffect(() => {
    // console.log("yo",previousScrollY.current)
    console.log("yo")
    window.addEventListener('scroll', handleScroll);

    // Restore previous scroll position after rendering new data
    // window.scrollTo(0, previousScrollY.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("khun")
    window.scrollTo(0, previousScrollY.current);
  }, [data]);

  const applyFilters = (data, filters) => {
    if (!filters.length) {
      return data; // Return original data if no filters applied
    }

    return data.filter(item => {
      return filters.every(filter => {
        const [filterType, filterValues] = Object.entries(filter)[0];
        return filterValues.includes(item[filterType]);
      });
    });
  };

  const filteredData = applyFilters(data, filters);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <FilterSection filters={filters} setFilters={setFilters}/>
        {filteredData?.map((item)=>{
          return(
            <div 
            // key={`${item.jdUid}-${item.companyName}`}
            >
                            <JobCard name={item.companyName}/>
            </div>
          )
         
        })}
        {console.log(data, loading, error)}
      </div>
  )
}

export default App
