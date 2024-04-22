import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';

const FundDetail = ({selectedFund}) => {
  console.log(selectedFund.schemeCode);
    const [specificData, setSpecificData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    
    const fetchData = async()=>{
      if (!selectedFund) return;
        try{
            const response = await fetch(`https://api.mfapi.in/mf/${selectedFund.schemeCode}`);
            if(!response.ok){
                throw new Error('Network response not Ok');
            }
            const jsonData = await response.json();
            console.log(jsonData);
            setSpecificData(jsonData);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
          }
    }
    fetchData();
  },[selectedFund.schemeCode])

  if (isLoading) {
    return <div className='loading'>Loading fund details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const dates = specificData.data.map(item => item.date);
  const navs = specificData.data.map(item => parseFloat(item.nav));
  
  return (
    <div className='specific_data'>
      <h1>{specificData?.meta?.scheme_name}</h1>
      <div className='fund_type'>
      <div>
        <h5>Fund House</h5>
        <p>{specificData?.meta?.fund_house}</p>

      </div>
      <div >
        <h5>Type</h5>
        <p>{specificData?.meta?.scheme_type}</p>
      </div>
      </div>
      

      <div className='category'>
        <h5>Category</h5>
        <p>{specificData?.meta?.scheme_category}</p>
      </div>
      <div className='nav'>
        <h5>Nav</h5>
        <p>{specificData?.data[0]?.nav}</p>
      </div>

      <LineChart dates={dates} navs={navs} />
    </div>
  )
}

export default FundDetail;