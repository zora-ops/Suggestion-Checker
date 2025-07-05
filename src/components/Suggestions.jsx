import React from 'react'
import { useState, useEffect } from 'react'
import SugBar from './SugBar';

const Suggestions = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setdata] = useState([]);
    const [userParam, setUserParam] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [result, setResult] = useState(false)


    const handlechange = (e) => {
        setUserParam(e.target.value.toLowerCase());
    }

    const handleClickBtn = (e) => {
        e.preventDefault()
        setResult(true)
        setDropDown(false)
    }

    const onclickli = (e) => {
        setUserParam(e.target.innerText);
        setDropDown(false);
        setMatchedUsers([]);
    }


    const fetchData = async () => {

        try {

            const res = await fetch(`https://dummyjson.com/users`);
            const rdata = await res.json();

            if (rdata && rdata.users && rdata.users.length) {
                setdata(rdata.users.map(item => item.firstName.toLowerCase()));
                setLoading(false);
                console.log(data);
            }


        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error)
        }

    }


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {

        if (userParam.length > 1) {
            const filteredData =
                data && data.length ?
                    data.filter(item => item.toLowerCase().indexOf(userParam) > -1)
                    : [];
            setMatchedUsers(filteredData);
            setDropDown(true);
        } else (
            setDropDown(false)
        );
        setResult(false);

    }, [userParam]);

    if (loading) {
        return <div>Loading Please Wait ...</div>
    }

s
    return (
        <div>
            <div>
                <form
                    onSubmit={handleClickBtn}
                    className="flex items-center gap-2 mb-4"
                >
                    <input
                        type="text"
                        placeholder="UserName..."
                        value={userParam}
                        onChange={handlechange}
                        className="px-4 py-2 w-full max-w-md border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                        type="submit"
                        onClick={handleClickBtn}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </form>

                {dropDown ?
                    <SugBar mData={matchedUsers} onclick={onclickli} />
                    : null}
            </div>
            <div>
                {result && (
                    <div
                        className={`mt-4 px-4 py-2 rounded-md ${matchedUsers.some(item => item.toLowerCase() === userParam)
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {matchedUsers.some(item => item.toLowerCase() === userParam)
                            ? `So this ${userParam} fella happened to be one of us`
                            : `So this ${userParam} fella isn't one of us`}
                    </div>
                )}
            </div>

        </div>
    )
}

export default Suggestions