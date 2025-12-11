// import React, { useState, useEffect, useRef } from 'react';
// import icon from '../assets/icon.png';
// import { RiResetLeftFill } from "react-icons/ri";
// import { MdCancel } from "react-icons/md";
// import { GiConfirmed } from "react-icons/gi";
// import { useNavigate } from 'react-router-dom';
// import { deleteMessages } from "../services/api";

// function Header({ handleResetChats }) {
//   const [showConfirm, setShowConfirm] = useState(false);
//   const dialogRef = useRef(null);
//   const navigate = useNavigate();

//   // ✅ FINAL — only ONE function now
//   const handleConfirmReset = async () => {
//     try {
//       await deleteMessages();          // clear backend history
//       handleResetChats();              // clear frontend state
//     } catch (err) {
//       console.error("Failed to clear server messages", err);
//     } finally {
//       setShowConfirm(false);
//     }
//   };

//   // Close dialog on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showConfirm && dialogRef.current && !dialogRef.current.contains(event.target)) {
//         setShowConfirm(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showConfirm]);

//   return (
//     <header className="relative py-4 bg-gray-900/90 backdrop-blur-lg shadow-sm">
//       <div className="flex justify-between px-4 sm:px-64 items-end">

//         <div className="flex items-center">
//           <img src={icon} alt="App Icon" className="w-8" />
//           <h1 className="text-xl font-bold text-gradient ml-2">Mindora</h1>

//           <button
//             onClick={() => navigate("/about")}
//             className="ml-4 px-4 py-1 border border-purple-500/40 rounded-full text-purple-200 hover:bg-purple-500/10 transition"
//           >
//             About
//           </button>
//         </div>

//         <button
//           onClick={() => setShowConfirm(true)}
//           className="text-red-400 bg-gray-600 p-1 rounded-full"
//           title="Reset Chat"
//         >
//           <RiResetLeftFill />
//         </button>
//       </div>

//       {showConfirm && (
//         <div
//           ref={dialogRef}
//           className="confirmation-dialog absolute z-100 top-12 right-4 sm:right-44 bg-gray-900/80 backdrop-blur-sm 
//           text-gray-300 p-4 rounded shadow-lg hover:shadow-purple-500/10 border border-gray-800"
//         >
//           <p>Want to reset chats?</p>

//           <div className="flex justify-end mt-2">
//             <button
//               onClick={() => setShowConfirm(false)}
//               className="mr-2 px-2 py-1 bg-gray-600 rounded"
//             >
//               <MdCancel size={25} />
//             </button>

//             <button
//               onClick={handleConfirmReset}
//               className="px-2 py-1 bg-red-600 rounded"
//             >
//               <GiConfirmed size={25} />
//             </button>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;



import React, { useState, useEffect, useRef } from 'react';
import icon from '../assets/icon.png';
import { RiResetLeftFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { deleteMessages } from "../services/api";

function Header({ handleResetChats, onOpenHistory }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  // RESET function
  const handleConfirmReset = async () => {
    try {
      await deleteMessages();      // clear backend
      handleResetChats();          // clear frontend
    } catch (err) {
      console.error("Failed to clear server messages", err);
    } finally {
      setShowConfirm(false);
    }
  };

  // Close confirm dialog when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showConfirm && dialogRef.current && !dialogRef.current.contains(event.target)) {
        setShowConfirm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showConfirm]);

  return (
    <header className="relative py-4 bg-gray-900/90 backdrop-blur-lg shadow-sm">
      <div className="flex justify-between px-4 sm:px-64 items-end">

        {/* LEFT SIDE (logo + about + history) */}
        <div className="flex items-center">
          <img src={icon} alt="App Icon" className="w-8" />
          <h1 className="text-xl font-bold text-gradient ml-2">Mindora</h1>

          <button
            onClick={() => navigate("/about")}
            className="ml-4 px-4 py-1 border border-purple-500/40 rounded-full text-purple-200 hover:bg-purple-500/10 transition"
          >
            About
          </button>

          {/* ⭐ History Button */}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="ml-3 px-4 py-1 border border-gray-700 rounded-full text-gray-300 hover:bg-gray-800/50 transition"
            >
              History
            </button>
          )}
        </div>

        {/* RESET BUTTON */}
        <button
          onClick={() => setShowConfirm(true)}
          className="text-red-400 bg-gray-600 p-1 rounded-full"
          title="Reset Chat"
        >
          <RiResetLeftFill />
        </button>
      </div>

      {/* CONFIRM RESET POPUP */}
      {showConfirm && (
        <div
          ref={dialogRef}
          className="absolute z-100 top-12 right-4 sm:right-44 bg-gray-900/80 backdrop-blur-sm 
          text-gray-300 p-4 rounded shadow-lg border border-gray-800"
        >
          <p>Want to reset chats?</p>

          <div className="flex justify-end mt-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="mr-2 px-2 py-1 bg-gray-600 rounded"
            >
              <MdCancel size={25} />
            </button>

            <button
              onClick={handleConfirmReset}
              className="px-2 py-1 bg-red-600 rounded"
            >
              <GiConfirmed size={25} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
