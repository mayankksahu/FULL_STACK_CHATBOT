import React from "react";

const InputArea = ({ input, setInput, handleInput, isLoading, handleSendMessage, outputType }) => {
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !isLoading && input.trim()) {
            handleSendMessage();
        }
    };

    return (
        <div className="relative w-full">
            <div className="relative group  ">
                <textarea
                    value={input}
                    placeholder={
                        outputType === "text" ? "Ask Mindora" : "Describe image"
                    }
                    className="w-full bg-transparent border-none outline-none text-gray-200 placeholder-gray-400 
        resize-none min-h-[32px] sm:min-h-[40px] max-h-[200px] overflow-y-auto text-sm sm:text-base
        leading-[32px] sm:leading-[40px] py-0" 
                    rows={1}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                />
                
            </div>
        </div>
    );
};

export default InputArea;