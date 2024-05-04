import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './action/actionCreator';
import JobCard from './components/JobCard';

function App() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state);
  const [offset, setOffset] = useState(0);
  const previousScrollY = useRef(0); //whenever the api gets called , this is getting set to 0.so going back to top again
  const debounceTimeout = useRef(null);

  useEffect(() => {
    // Fetch initial data when component mounts
    dispatch(fetchData(offset));  //api is getting called 2 times when the page first laods.
    // window.scrollTo({top:previousScrollY.current});
    console.log("in")
  }, [offset]);

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
        setOffset(prevOffset => prevOffset + 1); // Assuming limit is 10
      }
     
      // Store current scroll position
      previousScrollY.current = window.scrollY;
      console.log(previousScrollY.current, debounceTimeout)
    }, 200); // Adjust debounce delay as needed
  };

  // Attach scroll event listener when component mounts
  useEffect(() => {
    // console.log("yo",previousScrollY.current)
    window.addEventListener('scroll', handleScroll);

    // Restore previous scroll position after rendering new data
    window.scrollTo(0, previousScrollY.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
        {data?.map((index, item)=>{
          // console.log(item)
          return(
            <JobCard name={item}/>
          )
         
        })}
        {console.log(data, loading, error)}
      </div>
  )
}

export default App
