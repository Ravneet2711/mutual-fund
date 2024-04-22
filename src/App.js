import React,{useEffect,useState} from 'react'
import SearchFund from './Components/SearchFund';
import MutualList from './Components/MutualList';
import FundDetail from './Components/FundDetails';


const App = () => {
  const [data,setData] = useState(null);
  // const [error, setError] = useState(null);
  const [selectedFund, setSelectedFund] =  useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery,setSearchQuery] = useState('')

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response =  await fetch("https://api.mfapi.in/mf");
        if(!response.ok){
          throw new Error('Network response not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.slice(0, 20)); 
        setIsLoading(false);
      }catch(error){
        console.error(error);
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

  const handleFundClick = (schemeCode) => {
    const selected = data.find((item) => item.schemeCode === schemeCode);
    setSelectedFund(selected);
  };

  return (
    <div>
      <h1 className='main-heading'>Mutual Funds <span>India</span></h1>
      <SearchFund onSearch= {handleSearch}/>
      {selectedFund ? (
        <FundDetail selectedFund={selectedFund} />
      ) : (
        <MutualList data={data}  searchQuery ={searchQuery} fundClick={handleFundClick} />
      )}
     
      
       
    </div>
  )
}

export default App