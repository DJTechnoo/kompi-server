import React, {useState, useContext} from 'react';
import CompanyContext from '../../context/company/companyContext';

const Search = () => {
    const companyContext = useContext(CompanyContext);
    const [text, setText] = useState("");
    
    const onChangeHandler = (e) => {
        setText(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        companyContext.getCompaniesByName(text);
        setText("");
    }

  
    return(<div>
        <form onSubmit={onSubmitHandler} className="form">
            <input 
                type="text" 
                name="text" 
                onChange={onChangeHandler}
                value={text}
                placeholder="Finn din bedrift..."
            />
            <input
                type="submit"
                value="Søk"
                className="btn btn-dark width1"
            />
        </form>
        {companyContext.companies.length > 0 &&
        <button onClick={companyContext.clearSearchCompanies}>Clear</button>}
    </div>
    )
    
}

export default Search;