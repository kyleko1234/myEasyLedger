import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Form } from 'reactstrap';

function SearchBar({handleSearchSubmit, inputValue, clearSearch, onChange}) {

    return(
        <Form
            onSubmit={handleSearchSubmit}
        > 
            <div className="my-3 d-flex align-items-center position-relative">
                <style>{`
                    .search-icon {
                        position: absolute;
                        right: 12px;
                    }
                    .clear-icon {
                        position: absolute;
                        right: 35px;
                    }
                `} </style>
                <input 
                    type="search" 
                    className="form-control" 
                    placeholder="Search"
                    value={inputValue}
                    onChange={onChange}
                />                
                {inputValue && clearSearch
                    ? <Link className="clear-icon" onClick={clearSearch}>
                        <i className="fas fa-times-circle text-muted "></i>
                    </Link>
                    : null
                }
                <Link className="search-icon" onClick={handleSearchSubmit}>
                    <i className="fas fa-search text-muted"></i>
                </Link>
            </div>

        </Form>
    )
}

export default SearchBar;