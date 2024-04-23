import React,{useState} from 'react'

const SearchFund = ({onSearch}) => {
    const [query,setQuery] = useState(" ");

    const handleChange = (e) => {
      const inputValue = e.target.value;
      setQuery(inputValue);
      onSearch(inputValue); 
       
      };

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

  return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
    </form>
  )
}

export default SearchFund