import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './action/actionCreator';
import JobCard from './components/JobCard';
import FilterSection from './components/FilterSection';

function App() {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([])
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
    setFilteredData(applyFilters(data, filters))
    // filteredData = applyFilters(data, filters);

  }, [data, filters]);

  const applyFilters = (data, filters) => {
    if (filters.length === 0) {
      return data; // Return original data if no filters applied
    }
    console.log(filteredData)
    return data.filter(item => {
      return filters.every(filter => {
        const [filterType, filterValues] = Object.entries(filter)[0];
        const itemValue = item[filterType];
  
        // if (Array.isArray(filterValues)) {
        //   // If filter values is an array, check if item value is included in filter values
        //   return Array.isArray(itemValue) ? itemValue.some(val => filterValues.includes(val)) : filterValues.includes(itemValue);
        // } else {
          // If filter values is not an array, directly check for equality
          if (filterType === 'locationType') {
            // Special handling for locationType filter
            if (filterValues === 'remote') {
              // If filter is set to 'remote', check if item's location contains 'remote'
              return item.location.toLowerCase().includes('remote');
            } else if (filterValues === 'onsite') {
              // If filter is set to 'onsite', check if item's location does not contain 'remote'
              return !item.location.toLowerCase().includes('remote');
            }
          } else {
          return itemValue === filterValues;
          }
        // }
      });
    });

  };
  
  

  // const filteredData = applyFilters(data, filters);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='container'>
      <FilterSection filters={filters} setFilters={setFilters}/>
      <div className='cardsContainer'>
      {filteredData.length>0?
        filteredData.map((item)=>{
          return(
            <div 
            className='cardHolder'
            // key={`${item.jdUid}-${item.companyName}`}
            >
                            <JobCard name={item.companyName} logo={item.logoUrl} role={item.jobRole} location={item.location} minJdSalary={item.minJdSalary} maxJdSalary={item.maxJdSalary} jobDetailsFromCompany={item.jobDetailsFromCompany} minExp={item.minExp} jdLink={item.jdLink}/>
            </div>
          )
         
        })
        :
        <p>No data found!</p>
      }
      </div>
        
        {console.log(data, loading, error)}
      </div>
  )
}

export default App
