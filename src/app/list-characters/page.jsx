'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import ContentList from "@/components/characters/ContentList";
import Customized from "@/components/characters/Customized";
import Footer from "@/components/home/Footer";

export default function Home() {
    const [selectedPage, setSelectedPage] = useState('/');
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const renderComponent = () => {
        switch (selectedPage) {
            case 'icon':
                return <ContentList username={username} />;
            case 'customized':
                return <Customized />;
            default:
                return <ContentList username={username} />;
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const handlePageChange = (page) => {
        setSelectedPage(page);
        setIsOpen(false);
    };

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        } else {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.username);
                setIsLoading(false);
            } catch (err) {
                console.error("Token inválido:", err);
                Swal.fire("Error", "Invalid token. Please log in again.", "error");
                router.push("/login");
            }
        }
    }, []);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col">
            <nav className="bg-gray-300 p-4 border-b-2 border-red-600">
                <div className="flex justify-between items-center">
                    <img
                        onClick={() => handlePageChange('icon')}
                        src="https://images.ctfassets.net/swt2dsco9mfe/1qU2YMq2MSczf9KGme5gu7/a580e2f158f2c08faad3a9d4463af0bc/dnd-hub-logo.png?fm=avif"
                        alt="logo"
                        className="sm:h-10 md:h-20 h-8 hover:cursor-pointer"
                    />
                    <div className="hidden md:flex gap-10 absolute left-1/2 transform -translate-x-1/2">
                        <button
                            className="hover:cursor-pointer hover:bg-gray-500 hover:p-2 hover:rounded-lg"
                            onClick={() => handlePageChange('icon')}
                        >
                            Create your character
                        </button>
                        <button
                            className="hover:cursor-pointer hover:bg-gray-500 hover:p-2 hover:rounded-lg"
                            onClick={() => handlePageChange('customized')}
                        >
                            Your characters
                        </button>
                    </div>
                    <div
                        className="relative hidden md:block"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button className="text-sm text-white font-semibold px-4 py-2 rounded-lg shadow-md bg-gray-600 hover:bg-black hover:cursor-pointer">
                            Welcome, {username.charAt(0).toUpperCase() +username.slice(1)}!
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 w-48 bg-white border rounded-lg shadow-lg z-10 ">
                                <button
                                    onClick={() => router.push("/profile")}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:cursor-pointer"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-500 hover:cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="md:hidden" onClick={toggleMenu}>
                        {isOpen ? <AiOutlineClose size={24} /> : <CiMenuBurger size={24} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="flex flex-col gap-4 mt-4 md:hidden items-center">
                        <button onClick={() => handlePageChange('icon')}>Create your character</button>
                        <button onClick={() => handlePageChange('customized')}>Your characters</button>
                        <div className="text-sm text-gray-800 font-semibold">Welcome, {username.charAt(0).toUpperCase() +username.slice(1)}!</div>
                        <button onClick={logout} className="text-red-500">Logout</button>
                    </div>
                )}
            </nav>

            {renderComponent()}
            <Footer />
        </div>
    );
}
