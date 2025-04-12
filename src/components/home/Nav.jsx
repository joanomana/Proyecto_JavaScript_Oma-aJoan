'use client'
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

export default function Nav({ setSelectedPage }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handlePageChange = (page) => {
        setSelectedPage(page);
        setIsOpen(false); 
    };

    return (
        <nav className="bg-gray-300 p-4 border-b-2 border-red-600">
            <div className="flex justify-between items-center">
                <img
                onClick={() => handlePageChange('icon')} 
                    src="https://images.ctfassets.net/swt2dsco9mfe/1qU2YMq2MSczf9KGme5gu7/a580e2f158f2c08faad3a9d4463af0bc/dnd-hub-logo.png?fm=avif"
                    alt="logo"
                    className="sm:h-10 md:h-20 h-8 hover:cursor-pointer"
                />

                <button
                    className="md:hidden"
                    onClick={toggleMenu}
                > 
                    {isOpen ? <AiOutlineClose size={24} /> : <CiMenuBurger size={24} />} 
                </button>

                <div className=" hidden md:flex gap-10 absolute left-1/2 transform -translate-x-1/2">
                    <button className="hover:cursor-pointer hover:bg-gray-500 hover:p-2 hover:rounded-lg   " onClick={() => handlePageChange('characters')}>Characters</button>
                    <button className="hover:cursor-pointer hover:bg-gray-500 hover:p-2 hover:rounded-lg " onClick={() => handlePageChange('spells')}>Spells</button>
                    <button className="hover:cursor-pointer hover:bg-gray-500 hover:p-2 hover:rounded-lg " onClick={() => handlePageChange('languages')}>Languages</button>
                </div>

                <div className="hidden md:block">
                    <a href="/Login" className="p-2 rounded-lg bg-red-500">
                        Custom Character
                    </a>
                </div>
            </div>


            {isOpen && (
                <div className="flex flex-col gap-4 mt-4 md:hidden">
                    <button onClick={() => handlePageChange('characters')}>Characters</button>
                    <button onClick={() => handlePageChange('spells')}>Spells</button>
                    <button onClick={() => handlePageChange('languages')}>Languages</button>
                    <a href="/Login" className="p-2 rounded-lg bg-red-500">
                        Custom Character
                    </a>
                </div>
            )}
        </nav>
    );
}
