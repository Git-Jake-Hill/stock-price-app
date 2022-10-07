import { useState, useEffect } from "react";

export const AutoComplete = () => {
    const [company, setCompany] = useState("");

    const submit = (e) => {
        e.preventDefault();
        alert(company);
    }

    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input type="text" value={company} onChange={(event) => setCompany(event.target.value)} />
            </div>
            <form>
            </form>
        </div>)
}

// crate a input to search
// input html element

// onChange update search input
// send fetch request to api for company names autocomplete

// once company is selected
// add it to the watchList to update the table data
