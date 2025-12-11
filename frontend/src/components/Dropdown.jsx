import React, { useState, useEffect } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { LuLetterText } from "react-icons/lu";

const Dropdown = ({ outputType, setOutputType }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectOutputType = (type) => {
        setOutputType(type);
        setShowDropdown(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest(".dropdown-container")) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    return (
        <div className="relative dropdown-container ">
            <button
                onClick={toggleDropdown}
                className="  p-3 text-gray-400 hover:bg-purple-500/10 rounded-full transition-colors"
            >
                {outputType === "text" ? (
                    <LuLetterText size={20} />
                ) : (
                        <IoImagesOutline size={20} />
                )}
            </button>
            {showDropdown && (
                <div className="absolute bottom-full left-0 w-42 bg-gray-900 backdrop-blur-sm  border border-gray-800 
                hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 rounded-lg shadow-xl z-50 p-2 transform -translate-y-2">
                    <p className="text-gray-400 text-sm text-center pb-2">Response</p>
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => selectOutputType("text")}
                            className="flex items-center px-4 py-2 text-gray-200 bg-gray-900/50 backdrop-blur-sm  border border-gray-800 
                hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 rounded-md text-sm sm:text-base "
                        >
                            <LuLetterText size={20} />
                        </button>
                        <button
                            onClick={() => selectOutputType("image")}
                            className="flex items-center px-4 py-2 text-gray-200 bg-gray-900/50 backdrop-blur-sm  border border-gray-800 
                hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 rounded-md text-sm sm:text-base "
                        > <IoImagesOutline /> 
                             
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;