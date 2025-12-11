import React from "react";
import MessageItem from "./MessageItem";
import icon from "../assets/icon.png";

const MessageList = ({ messages, isLoading, outputType }) => {
    const LoadingIndicator = () => (
        <div className="flex items-start">
            <div className="w-8 h-8 rounded-full mr-1">
                <img src={icon} alt="Bot" className="w-full h-full object-cover" />
            </div>
            <div className="p-4 rounded-2xl rounded-bl-sm">
                {outputType === "text" ? (
                    <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                            <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-300">Thinking....</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col space-y-4 relative z-0">
            {messages.map((msg, index) => (
                <MessageItem key={index} message={msg} />
            ))}
            {isLoading && <LoadingIndicator />}
        </div>
    );
};

export default MessageList;
