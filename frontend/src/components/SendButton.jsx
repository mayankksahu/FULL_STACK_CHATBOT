import React from "react";
import { IoSendOutline } from "react-icons/io5";
const SendButton = ({ input, handleSendMessage }) => {
    return (
        <button
            onClick={() => input.trim() && handleSendMessage()}
            className="p-3 text-gray-400 hover:bg-[#404040] rounded-full transition-colors flex-shrink-0"
        >
            <IoSendOutline size={25} />
        </button>
    );
};

export default SendButton;
