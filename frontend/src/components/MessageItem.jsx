// src/components/MessageItem.jsx
import React, { useState } from "react";
import icon from '../assets/icon.png';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiDownload, FiCheck } from 'react-icons/fi';

const ActionButton = ({ onClick, icon: Icon, tooltip, isCopied }) => {
  return (
    <button
      onClick={onClick}
      className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-white"
      title={tooltip}
    >
      {isCopied ? <FiCheck size={16} className="text-green-500" /> : <Icon size={16} />}
    </button>
  );
};

const MessageItem = ({ message }) => {
  const isBot = message.sender !== "user";
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mindora-image.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download image:', err);
      // optional: show a small user-facing message instead of alert
    }
  };

  const copyImageToClipboard = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const item = new ClipboardItem({ [blob.type || 'image/png']: blob });
      await navigator.clipboard.write([item]);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy image:', err);
    }
  };

  const openImageInNewTab = (url) => {
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Failed to open image:", err);
    }
  };

  return (
    <div
      data-message-id={message._id}
      className={`flex w-full ${isBot ? "justify-start" : "justify-end"} p-2 relative z-0`}
    >
      {isBot && (
        <div className="w-8 h-8 overflow-hidden mr-2 self-start mb-2 hidden sm:block">
          <img src={icon} alt="Bot" className="w-full h-full object-cover" />
        </div>
      )}

      <div
        className={`relative px-4 py-2 m-1 max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl text-white bg-gray-900/50 backdrop-blur-sm border border-gray-800 
          ${isBot ? "rounded-tl-none" : "rounded-br-none bg-gray-500/50"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isBot && isHovered && (
          <div className="absolute bottom-2 right-2 flex gap-2 transition-opacity duration-200">
            {message.type === "image" ? (
              <>
                <ActionButton
                  onClick={() => copyImageToClipboard(message.text)}
                  icon={FiCopy}
                  tooltip="Copy image"
                  isCopied={isCopied}
                />
                <ActionButton
                  onClick={() => downloadImage(message.text)}
                  icon={FiDownload}
                  tooltip="Download image"
                />
              </>
            ) : (
              <ActionButton
                onClick={() => copyToClipboard(message.text)}
                icon={FiCopy}
                tooltip="Copy text"
                isCopied={isCopied}
              />
            )}
          </div>
        )}

        {message.type === "image" ? (
          <>
            {/* Show skeleton while loading */}
            {imgLoading && !imgError && (
              <div className="w-[50%] h-48 bg-gray-800/60 rounded-md flex items-center justify-center text-gray-400">
                Loading image...
              </div>
            )}

            {!imgError ? (
              <img
                src={message.text}
                alt="Generated content"
                onLoad={() => setImgLoading(false)}
                onError={() => {
                  setImgError(true);
                  setImgLoading(false);
                }}
                style={{
                  display: imgLoading ? "none" : "block",
                  width: "50%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
              />
            ) : (
              // friendly fallback UI when image fails to load
              <div className="w-[50%] p-3 bg-gray-800 rounded-md">
                <p className="text-sm text-gray-300 mb-2">Image unavailable</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openImageInNewTab(message.text)}
                    className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600"
                  >
                    Open image
                  </button>
                  <button
                    onClick={() => {
                      // attempt to re-check the image (reset states)
                      setImgError(false);
                      setImgLoading(true);
                      // slight delay helps if resource was temporary
                      setTimeout(() => {
                        // force reload by creating a new image element
                        const img = new Image();
                        img.src = message.text;
                        img.onload = () => {
                          setImgLoading(false);
                        };
                        img.onerror = () => {
                          setImgError(true);
                          setImgLoading(false);
                        };
                      }, 200);
                    }}
                    className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600"
                  >
                    Retry
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">{message.text}</p>
              </div>
            )}
          </>
        ) : (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const code = String(children).replace(/\n$/, "");
                const [isCodeCopied, setIsCodeCopied] = useState(false);
                const [isCodeHovered, setIsCodeHovered] = useState(false);

                const handleCopy = async () => {
                  try {
                    await navigator.clipboard.writeText(code);
                    setIsCodeCopied(true);
                    setTimeout(() => setIsCodeCopied(false), 2000);
                  } catch (err) {
                    console.error("Failed to copy code:", err);
                  }
                };

                return !inline && match ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsCodeHovered(true)}
                    onMouseLeave={() => setIsCodeHovered(false)}
                  >
                    <SyntaxHighlighter
                      style={materialDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md"
                      {...props}
                    >
                      {code}
                    </SyntaxHighlighter>
                    {isCodeHovered && (
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-white transition-colors duration-200"
                        >
                          {isCodeCopied ? (
                            <>
                              <FiCheck size={14} className="text-green-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <FiCopy size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <code className={`${className} bg-gray-800 px-1 rounded`} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
