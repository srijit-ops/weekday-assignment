import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./action/actionCreator";
import JobCard from "./components/JobCard";
import FilterSection from "./components/FilterSection";

function App() {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const { loading, data, error } = useSelector((state) => state);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState([]);
  const previousScrollY = useRef(0);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    // Fetch initial data when component mounts
    dispatch(fetchData(offset));
  }, [dispatch, offset]);

  const handleScroll = () => {
    // Clear the previous debounce timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Debounce the API call
    debounceTimeout.current = setTimeout(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Increment offset and fetch more data
        setOffset((prevOffset) => prevOffset + 10);
      }
      // Store current scroll position
      previousScrollY.current = window.scrollY;
    }, 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, previousScrollY.current);
    setFilteredData(applyFilters(data, filters));
  }, [data, filters]);

  const applyFilters = (data, filters) => {
    if (filters.length === 0) {
      return data; // Return original data if no filters applied
    }
    return data.filter((item) => {
      return filters.every((filter) => {
        const [filterType, filterValues] = Object.entries(filter)[0];
        const itemValue = item[filterType];
        if (filterType === "locationType") {
          if (filterValues === "remote") {
            return item.location.toLowerCase().includes("remote");
          } else if (filterValues === "onsite") {
            return !item.location.toLowerCase().includes("remote");
          }
        } else if (filterType === "minJdSalary") {
          return itemValue >= filterValues;
        } else if (filterType === "minExp") {
          return itemValue <= filterValues;
        } else {
          return itemValue.toLowerCase() === filterValues.toLowerCase();
        }
      });
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
          fontWeight: 600,
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
          fontWeight: 600,
        }}
      >
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container">
      <FilterSection filters={filters} setFilters={setFilters} />
      {filteredData.length > 0 ? (
        <div className="cardsContainer">
          {filteredData.map((item) => {
            return (
              <div
                className="cardHolder"

              >
                <JobCard
                  name={item.companyName}
                  logo={item.logoUrl}
                  role={item.jobRole}
                  location={item.location}
                  minJdSalary={item.minJdSalary}
                  maxJdSalary={item.maxJdSalary}
                  jobDetailsFromCompany={item.jobDetailsFromCompany}
                  minExp={item.minExp}
                  jdLink={item.jdLink}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: 600,
            marginTop: "6rem",
          }}
        >
          No data found!
        </p>
      )}
    </div>
  );
}

export default App;
