import React, { useRef,useState } from "react";
import Autosuggest from "react-autosuggest";
import { useSelector, useDispatch } from "react-redux";
import { resetSearchItem, searchItem, updateSearchVal, updateSearchSelectVal } from "../../../store/actions/searchItem";
import debounce from 'lodash/debounce';

const debouncedSearch = debounce((value,dispatch) => dispatch(searchItem(value)), 1000);

const HeaderSearch = (props) => {
    let dispatch = useDispatch();
    const focusOut = useRef(null);
    const { suggestions, selectedVal, value } = useSelector((state) => state.searchItemInfo);
    const [searchValue, setSearchValue] = useState('');
    
    const onChangeSearch = (event, { newValue, method }) => {
        setSearchValue(newValue);
        debouncedSearch.cancel(); //cancel the previous search and start new search
        debouncedSearch(newValue,dispatch);
        dispatch(updateSearchVal(newValue));

        // debouncedSearch(searchItem(newValue));
        // dispatch(updateSearchVal(newValue));
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        dispatch(updateSearchVal(suggestion.name));
        dispatch(updateSearchSelectVal(suggestion));
        dispatch(resetSearchItem());
        // searchProduct(suggestion); // search selected prod on server
    };
    
    const getSuggestionValue = (suggestion) => {
        // if (suggestion.Title) {
        //   return this.state.value;
        // }
        return suggestion.name;
    };

    const inputProps = {
        placeholder: "What you are looking...",
        value,
        onChange: onChangeSearch,
        ref: focusOut,
    };

    React.useEffect(() => {
        var wage = document.getElementsByClassName("react-autosuggest__input")[0];
        wage.addEventListener("keydown", function (e) {
            if (e.key === 13) {
                console.log("hit enter")
            }
        });
        return () => wage.removeEventListener("keydown", (e) => { })
    }, [document.getElementsByClassName("react-autosuggest__input--focused")[0]]);

    return (
        <div className="search-brand">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={() => dispatch(resetSearchItem())}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={(suggest) =>
                    renderSuggestion(suggest, value)
                }
                onSuggestionSelected={onSuggestionSelected}
                inputProps={inputProps}
            />
            <i
                // onClick={() => props.searchProduct(selectedVal)} // SEARCH PROduct online
                className="icon-search"
            ></i>
        </div>
    );
};
export default HeaderSearch;

const renderSuggestion = (suggestion, value) => {
    if (suggestion === "not") {
        return (
            <button disabled={true}>
                <strong>Sorry no data found. {value}</strong>
            </button>
        );
    }
    return suggestion.name;
};

const onSuggestionsFetchRequested = ({ value }) => {
    // this.setState({
    //   suggestions: getSuggestions(value)
    // });
};
