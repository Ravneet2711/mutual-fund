import React,{useEffect,useState} from 'react'
import SearchFund from './Components/SearchFund';
import MutualList from './Components/MutualList';
import FundDetail from './Components/FundDetails';


const App = () => {
  const [data,setData] = useState(null);
  const [selectedFund, setSelectedFund] =  useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery,setSearchQuery] = useState('');
  const [showAllResults, setShowAllResults] = useState(false);

  useEffect(()=>{
    const fetchData = async()=>{
      setIsLoading(true);
      try{
        const response =  await fetch("https://api.mfapi.in/mf");
        if(!response.ok){
          throw new Error('Network response not ok');
        }
        const jsonData = await response.json();
        setData(jsonData); 
        setIsLoading(false);
      }catch(error){
        console.error(error);
      }
      finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  },[]);

  const handleSearch =(query)=>{
    setSearchQuery(query);
    setSelectedFund(null);
  }
  

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }
  console.log(data.slice(0,20));

  const handleFundClick = (schemeCode) => {
    const selected = data.find((item) => item.schemeCode === schemeCode);
    setSelectedFund(selected);
  };

  const handleShowAll = () => {
    setIsLoading(true); 
    setShowAllResults(true);
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className='main-heading'>Mutual Funds <span>India</span></h1>
      <SearchFund onSearch= {handleSearch}/>
      
      {selectedFund ? (
        <FundDetail selectedFund={selectedFund} />
      ) : (
        <>
         <MutualList data={ !showAllResults ? data.slice(0,8) : data } searchQuery ={searchQuery} fundClick={handleFundClick} />
        {!showAllResults && (
            <button onClick={handleShowAll} className='result_btn'>Show All Results</button>
          )}
        </>
      )}
    
    </div>
  )
}

export default App