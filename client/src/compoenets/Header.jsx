import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        // prevent refreshing
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);
    return (
        // good for seo purposes if change the tag to something meaningful
        <header className='bg-slate-200 shadow-md'>
            {/* header mein sab ko adjust karne ke liye div ke 
            andar laana hoga */}
            {/* mx-auto marginX auto */}
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                {/* routing */}
                <Link to='/'>
                    {/* dono mein implement hoga */}
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>

                        {/* responsiveness

                        flex-wrap -> in the mobile size if we check we can see that they are next to each other and when we add the search bar abd menu it will be a little big so we want to bring them on top of each other after that so flex wrap is added for thsi reason */}


                        {/* spam used to write the name of the website */}
                        <span className='text-slate-500'>Lease or Buy</span>
                        <span className='text-slate-700'> Estate</span>
                    </h1>
                </Link>
                <form
                    onSubmit={handleSubmit}
                    // ye karne se search wala icon box mein align ho
                    // jayega
                    className='bg-slate-100 p-3 rounded-lg flex items-center'
                >
                    <input
                        // placeholder mein kya jayega type text 
                        type='text'
                        placeholder='Search...' // placeholder mein ye
                        // text aayega
                        className='bg-transparent focus:outline-none w-24 sm:w-64' // sm: small size and above
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>
                {/* sab mein implement hoga */}
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            About
                        </li>
                    </Link>
                    <Link to='/profile'>
                        {/* current user exist karta h to */}
                        {currentUser ? (
                            <img
                                className='rounded-full h-7 w-7 object-cover'// image ka styling jo 
                                // appear hoga
                                // image saved hai
                                src={currentUser.avatar}
                                // alternate ho jayega
                                alt='profile'
                            />
                        ) : (
                            <li className=' text-slate-700 hover:underline'> Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}