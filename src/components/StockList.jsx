import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";
import { FINHUB_API_KEY } from "../API_KEYS";

export const StockList = () => {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get(`/quote?symbol=MSFT&token=${FINHUB_API_KEY}`)
                console.log(response)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [])

    return ( <div>StockList</div>)
}