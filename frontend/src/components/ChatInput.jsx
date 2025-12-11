import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import InputArea from "./InputArea";
import SendButton from "./SendButton";

const ChatInput = ({ handleSendMessage, input, setInput, isLoading, outputType, setOutputType }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleInput = (e) => {
        const target = e.target;
        target.style.height = "auto";
        const newHeight = Math.min(target.scrollHeight, 200);
        target.style.height = `${newHeight}px`;

        const hasMultipleLines = target.value.split("\n").length > 1 || target.scrollHeight > 40;
        setIsExpanded(hasMultipleLines);
    };

    return (
        <div
            className={`w-full bg-[#2D2D2D] shadow-lg  p-3 sm:p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 
                hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 ${isExpanded ? "rounded-md" : "rounded-full"
                }`}
        >
            <div className="flex items-end gap-2 sm:gap-4">
                {/* Dropdown for selecting output type */}
                <Dropdown outputType={outputType} setOutputType={setOutputType} />

                {/* Input area for typing */}
                <InputArea
                    input={input}
                    setInput={setInput}
                    handleInput={handleInput}
                    isLoading={isLoading}
                    handleSendMessage={handleSendMessage}
                    outputType={outputType}
                />

                {/* Send button */}
                <SendButton input={input} handleSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatInput;



