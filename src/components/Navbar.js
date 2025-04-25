import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <nav className="bg-primary shadow-lg h-16 fixed top-0 left-0 right-0 z-10">
            <div className="container mx-auto px-4 h-full">
                <div className="flex justify-between items-center h-full">
                    <Link
                        to="/"
                        className="text-white text-2xl font-bold whitespace-nowrap"
                        style={{ minWidth: '150px' }}
                    >
                        Movie Explorer
                    </Link>
                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                        >
                            Home
                        </Link>
                        <Link
                            to="/favorites"
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center whitespace-nowrap"
                            style={{ minWidth: '80px' }}
                        >
                            Favorites
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 
