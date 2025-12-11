// // src/components/HistorySidebar.jsx
// import React, { useEffect, useState } from "react";
// import { fetchMessages } from "../services/api";

// function formatPreview(text, n = 80) {
//     if (!text) return "";
//     return text.length > n ? text.slice(0, n) + "…" : text;
// }

// export default function HistorySidebar({ open, onClose, onSelectMessage }) {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [q, setQ] = useState("");

//     const load = async () => {
//         setLoading(true);
//         try {
//             let msgs = await fetchMessages();
//             msgs = msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

//             const groups = [];
//             let current = null;

//             msgs.forEach((m) => {
//                 if (m.sender === "user") {
//                     // start a new group
//                     current = { user: m, ai: null };
//                     groups.push(current);
//                 } else if (m.sender === "bot") {
//                     // attach AI reply to the last user message
//                     if (current) current.ai = m;
//                 }
//             });

//             // newest first
//             setItems(groups.reverse());
//         } catch (err) {
//             console.error("Failed to load history", err);
//             setItems([]);
//         } finally {
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         if (open) load();
//     }, [open]);

//     const filtered = items.filter((it) =>
//         it.text.toLowerCase().includes(q.trim().toLowerCase())
//     );

//     return (
//         <div
//             className={`fixed top-0 right-0 h-full w-[22rem] bg-gray-900/95 border-l border-gray-800 z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
//                 }`}
//         >
//             <div className="p-3 flex items-center justify-between border-b border-gray-800">
//                 <div>
//                     <h3 className="text-sm font-semibold">Conversation History</h3>
//                     <p className="text-xs text-gray-400">AI replies (latest first)</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <button
//                         onClick={load}
//                         title="Refresh"
//                         className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
//                     >
//                         ⟳
//                     </button>
//                     <button
//                         onClick={onClose}
//                         title="Close"
//                         className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
//                     >
//                         ✕
//                     </button>
//                 </div>
//             </div>

//             <div className="p-3 border-b border-gray-800">
//                 <input
//                     value={q}
//                     onChange={(e) => setQ(e.target.value)}
//                     placeholder="Search history..."
//                     className="w-full p-2 rounded bg-gray-800 placeholder-gray-400 text-sm outline-none"
//                 />
//             </div>

//             <div className="overflow-y-auto h-[calc(100%-7.5rem)] p-2">
//                 {loading ? (
//                     <p className="text-sm text-gray-400 p-2">Loading…</p>
//                 ) : filtered.length === 0 ? (
//                     <p className="text-sm text-gray-500 p-2">No history found.</p>
//                 ) : (
//                     filtered.map((it) => (
//                         <HistoryItem key={it._id} item={it} onClick={() => onSelectMessage(it)} />
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }

// function HistoryItem({ item, onClick }) {
//     return (
//         <div
//             onClick={onClick}
//             className="cursor-pointer p-3 rounded hover:bg-gray-800/60 border-b border-gray-800"
//         >
//             <p className="text-gray-300 text-sm font-semibold">
//                 You: {item.user?.text || "(no text)"}
//             </p>

//             {item.ai?.type === "image" ? (
//                 <img
//                     src={item.ai.text}
//                     alt="ai"
//                     className="w-28 h-28 object-cover rounded mt-2"
//                 />
//             ) : (
//                 <p className="text-gray-400 text-sm mt-1">
//                     AI: {item.ai?.text || "(no reply)"}
//                 </p>
//             )}

//             <p className="text-xs text-gray-500 mt-1">
//                 {new Date(item.user.timestamp).toLocaleString()}
//             </p>
//         </div>
//     );
// }




// src/components/HistorySidebar.jsx
import React, { useEffect, useState } from "react";
import { fetchMessages } from "../services/api";

/**
 * HistorySidebar
 * - shows grouped (user -> ai) pairs, newest first
 * - safe search (guards against undefined)
 * - onSelectMessage receives the group { user, ai }
 */
export default function HistorySidebar({ open, onClose, onSelectMessage }) {
  const [items, setItems] = useState([]); // grouped items: { user, ai }
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      let msgs = await fetchMessages();

      // Ensure chronological order
      msgs = msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      // Group into pairs: each user message with the next bot reply (if any)
      const groups = [];
      let current = null;

      msgs.forEach((m) => {
        if (m.sender === "user") {
          current = { user: m, ai: null };
          groups.push(current);
        } else if (m.sender === "bot") {
          if (current) {
            // attach ai to the last user
            current.ai = m;
            // close current so that another bot doesn't accidentally attach to same user
            current = null;
          } else {
            // edge-case: bot message without preceding user -> create a standalone group
            groups.push({ user: null, ai: m });
          }
        } else {
          // unknown sender - include as standalone
          groups.push({ user: null, ai: m });
          current = null;
        }
      });

      // newest first
      setItems(groups.reverse());
    } catch (err) {
      console.error("Failed to load history", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) load();
  }, [open]);

  // safe text getter for group for search + preview
  const groupText = (g) => {
    const userText = g?.user?.text ?? "";
    const aiText = g?.ai?.text ?? "";
    return `${userText} ${aiText}`.trim();
  };

  // filter safely (guard against undefined)
  const filtered = items.filter((g) => {
    const hay = groupText(g).toLowerCase();
    return hay.includes((q || "").trim().toLowerCase());
  });

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[22rem] bg-gray-900/95 border-l border-gray-800 z-50 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-3 flex items-center justify-between border-b border-gray-800">
        <div>
          <h3 className="text-sm text-gray-400 font-semibold">Conversation History</h3>
          <p className="text-xs text-gray-400">Grouped (You → AI) — newest first</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={load}
            title="Refresh"
            className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
          >
            ⟳
          </button>

          <button
            onClick={onClose}
            title="Close"
            className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-3 border-b border-gray-800">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search history..."
          className="w-full p-2 rounded bg-gray-800 placeholder-gray-400 text-sm outline-none"
        />
      </div>

      <div className="overflow-y-auto h-[calc(100%-7.5rem)] p-2">
        {loading ? (
          <p className="text-sm text-gray-400 p-2">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-500 p-2">No history found.</p>
        ) : (
          filtered.map((g, idx) => (
            <GroupedHistoryItem
              key={g.user?._id ?? g.ai?._id ?? idx}
              group={g}
              onClick={() => {
                onSelectMessage(g.user ?? g.ai);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function GroupedHistoryItem({ group, onClick }) {
  const userText = group?.user?.text ?? "";
  const aiText = group?.ai?.text ?? "";
  const time = group?.user?.timestamp ?? group?.ai?.timestamp ?? null;
  const shortUser = userText.length > 90 ? userText.slice(0, 90) + "…" : userText;
  const shortAi = aiText.length > 120 ? aiText.slice(0, 120) + "…" : aiText;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-3 rounded hover:bg-gray-800/60 border-b border-gray-800"
    >
      {userText ? (
        <p className="text-gray-100 text-sm font-medium">You: {shortUser}</p>
      ) : (
        <p className="text-gray-400 text-sm italic">You: (no user message)</p>
      )}

      {group.ai ? (
        group.ai.type === "image" ? (
          <img src={group.ai.text} alt="ai" className="w-28 h-28 object-cover rounded mt-2" />
        ) : (
          <p className="text-gray-400 text-sm mt-1">AI: {shortAi}</p>
        )
      ) : (
        <p className="text-gray-500 text-xs mt-1">AI: (no reply yet)</p>
      )}

      {time && <p className="text-xs text-gray-500 mt-1">{new Date(time).toLocaleString()}</p>}
    </div>
  );
}
