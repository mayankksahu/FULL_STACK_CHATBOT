// import React, { useState, useEffect, useRef } from "react";
// import ChatInput from "./ChatInput";
// import MessageList from "./MessageList";
// import Header from "./Header";
// import { Helmet } from "react-helmet";
// import { fetchMessages, postMessage } from "../services/api";

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [outputType, setOutputType] = useState("text");
//   const chatContainerRef = useRef(null);

//   // Fetch history from backend
//   useEffect(() => {
//     (async () => {
//       try {
//         const history = await fetchMessages();
//         setMessages(history);
//       } catch (err) {
//         console.error("Failed to load chat history:", err);
//       }
//     })();
//   }, []);

//   // Auto-scroll
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!input.trim() || isLoading) return;

//     const text = input.trim();
//     setInput("");

//     // Optimistic user message
//     const optimisticUser = {
//       _id: `temp-${Date.now()}`,
//       text,
//       sender: "user",
//       type: outputType,
//       timestamp: new Date().toISOString(),
//     };

//     setMessages((prev) => [...prev, optimisticUser]);
//     setIsLoading(true);

//     try {
//       // Send to backend
//       const { userMessage, aiMessage } = await postMessage(text, outputType);

//       // Replace optimistic message with real one + AI reply
//       setMessages((prev) => [
//         ...prev.filter((m) => m._id !== optimisticUser._id),
//         userMessage,
//         aiMessage,
//       ]);
//     } catch (error) {
//       console.error("Message send failed:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           _id: `err-${Date.now()}`,
//           text: "⚠️ Something went wrong. Please try again.",
//           sender: "bot",
//           type: "text",
//         },
//       ]);
//     }

//     setIsLoading(false);
//   };

//   const handleResetChats = () => {
//     setMessages([]);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-950">
//       <Helmet>
//         <title>Mindora Chat</title>
//       </Helmet>

//       <Header handleResetChats={handleResetChats} />

//       <main
//         ref={chatContainerRef}
//         className="flex-1 px-4 sm:px-[25vw] overflow-y-auto py-4"
//       >
//         {messages.length === 0 ? (
//           <div className="flex mt-32 flex-col items-center text-gray-400 text-center">
//             <p className="text-lg font-semibold">Welcome to Mindora!</p>
//             <p className="text-sm">Start typing to begin your conversation.</p>
//           </div>
//         ) : (
//           <MessageList messages={messages} isLoading={isLoading} outputType={outputType} />
//         )}
//       </main>

//       <footer className="px-4 sm:px-[25vw]">
//         <ChatInput
//           handleSendMessage={handleSendMessage}
//           input={input}
//           setInput={setInput}
//           isLoading={isLoading}
//           outputType={outputType}
//           setOutputType={setOutputType}
//         />
//         <p className="text-center text-gray-600 py-2 text-[10px]">
//           Powered by Mindora © {new Date().getFullYear()}
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default ChatApp;




// src/components/ChatApp.jsx
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { fetchMessages, postMessage } from "../services/api";
import HistorySidebar from "./HistorySidebar";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [outputType, setOutputType] = useState("text");
  const chatContainerRef = useRef(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Fetch history from backend
  useEffect(() => {
    (async () => {
      try {
        const history = await fetchMessages();
        setMessages(history);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    })();
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const text = input.trim();
    setInput("");

    const optimisticUser = {
      _id: `temp-${Date.now()}`,
      text,
      sender: "user",
      type: outputType,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticUser]);
    setIsLoading(true);

    try {
      const { userMessage, aiMessage } = await postMessage(text, outputType);

      setMessages((prev) => [
        ...prev.filter((m) => m._id !== optimisticUser._id),
        userMessage,
        aiMessage,
      ]);
    } catch (error) {
      console.error("Message send failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          _id: `err-${Date.now()}`,
          text: "⚠️ Something went wrong. Please try again.",
          sender: "bot",
          type: "text",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChats = () => {
    setMessages([]);
  };

  // Scroll to a specific message and highlight briefly
  const scrollToMessage = (message) => {
    if (!message || !message._id) return;
    const el = document.querySelector(`[data-message-id="${message._id}"]`);
    if (el && chatContainerRef.current) {
      const container = chatContainerRef.current;
      const top = el.offsetTop - 20;
      container.scrollTo({ top, behavior: "smooth" });
      el.classList.add("ring-2", "ring-purple-500/40");
      setTimeout(() => el.classList.remove("ring-2", "ring-purple-500/40"), 1800);
    }
    setHistoryOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <Helmet>
        <title>Mindora Chat</title>
      </Helmet>

      {/* pass onOpenHistory to header */}
      <Header handleResetChats={handleResetChats} onOpenHistory={() => setHistoryOpen(true)} />

      <main ref={chatContainerRef} className="flex-1 px-4 sm:px-[25vw] overflow-y-auto py-4">
        {messages.length === 0 ? (
          <div className="flex mt-32 flex-col items-center text-gray-400 text-center">
            <p className="text-lg font-semibold">Welcome to Mindora!</p>
            <p className="text-sm">Start typing to begin your conversation.</p>
          </div>
        ) : (
          <MessageList messages={messages} isLoading={isLoading} outputType={outputType} />
        )}
      </main>

      <footer className="px-4 sm:px-[25vw]">
        <ChatInput
          handleSendMessage={handleSendMessage}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          outputType={outputType}
          setOutputType={setOutputType}
        />
        <p className="text-center text-gray-600 py-2 text-[10px]">Powered by Mindora © {new Date().getFullYear()}</p>
      </footer>

      <HistorySidebar open={historyOpen} onClose={() => setHistoryOpen(false)} onSelectMessage={scrollToMessage} />
    </div>
  );
};

export default ChatApp;
