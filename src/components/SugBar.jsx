import React from 'react'

const SugBar = ({ mData, onclick }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-md max-w-md w-full mt-2">
            <ul>
                {mData && mData.length > 0 && mData.map((item) => (
                    <li
                        key={item}
                        onClick={onclick}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default SugBar