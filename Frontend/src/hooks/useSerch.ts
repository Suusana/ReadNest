import { useState } from "react";

const useSearch = () => {
    const [SearchItem, setSearchItem] = useState<string>(""); //set search Item
    const [showAlert, setShowAlert] = useState<boolean>(false); //set alert visible
    const [prevSearchItem, setPrevSearchItem] = useState<string>(""); //check prevSearchItem
    const [noResult, setNoResult] = useState<Boolean>(false); //show no result found

    return {
        SearchItem,setSearchItem,showAlert, setShowAlert,
        prevSearchItem, setPrevSearchItem,noResult, setNoResult
    };
};

export default useSearch;