import React from 'react'

export const SaveAsJson = ({ text, filename, jsonData }) => {
    return (
        <a
            className='save_as_json__button'
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(jsonData)
            )}`}
            download={`${filename}.json`}
        >
            {text}
        </a>
    )
}
