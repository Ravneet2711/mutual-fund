import React,{useState} from 'react'

const SearchFund = ({onSearch}) => {
    const [query,setQuery] = useState(" ");

    const handleChange = (e) => {
        setQuery(e.target.value);
      };

    const handleSubmit=(e)=>{
        e.preventDefault();
        onSearch(query)
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