import React from 'react'

const MutualList = ({data,searchQuery,fundClick}) => {

    const filteredData = data.filter(item =>
    item.schemeName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    console.log(filteredData);

  return (
    <div>
        <ul>
          {filteredData.map((item,index)=><li key={index} onClick={() => fundClick(item.schemeCode)}> {item.schemeName}</li>)}
        </ul>
        
    </div>
  )
}

export default MutualList