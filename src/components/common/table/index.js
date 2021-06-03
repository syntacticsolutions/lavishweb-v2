import React from 'react';

export const Table = ({data, configs, additionalData, maxHeight}) => {
    const headers = configs.map(({title}) => title)


    return (
        <div className="lavish-table" style={{maxHeight}}>
            <table border="0">
                <thead>
                    {headers.map((header) => (
                        <th>{header}</th>
                    ))}
                </thead>
                <tbody>
                    {data.map((row) =>
                        <tr>
                            {configs.map((config) => (
                                <>
                                    {
                                        config.content ?
                                            <td>{config.content({ row, additionalData })}</td> :
                                            <td>{row?.[config.key]}</td>
                                    }
                                </>
                            ))}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}