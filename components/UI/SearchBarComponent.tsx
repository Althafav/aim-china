import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io';

export default function SearchBarComponent() {
    const [isToggle, setIsToggle] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query)}`);
        }
    };
    return (
        <div className=" global-search-component-wrapper">
            <div onClick={() => setIsToggle(!isToggle)}>
                {!isToggle ? (
                    <CiSearch
                        color="white"
                        size={30}
                        cursor="pointer"

                    />
                ) : (
                    <div className='text-white d-flex flex-column'>
                        <IoMdClose
                            color="white"
                            size={20}
                            cursor="pointer" />
                       
                    </div>
                )}

            </div>
            {isToggle && (
                <form onSubmit={handleSearchSubmit} className=" global-search-bar">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="global-search-input form-control"
                        autoFocus
                    />
                </form>
            )}
        </div>
    )
}
