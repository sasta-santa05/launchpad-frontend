// MessagingContext.js
// Lightweight context — just tracks total unread count
// Actual message data is fetched per-page from real backend
import React, { createContext, useContext, useState } from 'react';

const MessagingContext = createContext(null);

export function MessagingProvider({ children }) {
  const [totalUnread, setTotalUnread] = useState(0);

  const updateUnread = (count) => setTotalUnread(count);

  return (
    <MessagingContext.Provider value={{ totalUnread, updateUnread }}>
      {children}
    </MessagingContext.Provider>
  );
}

export const useMessaging = () => useContext(MessagingContext);
