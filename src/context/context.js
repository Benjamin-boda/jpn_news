import React, { useState } from "react";

export const NewsContext = React.createContext();

export const NewsProvider = ({ children }) => {
  const [newsArray, setNewsArray] = useState(null)
  const [newsTitle, setNewsTitle] = useState(null)

  return (
    <NewsContext.Provider
      value={{
        newsArray,
        setNewsArray,
        newsTitle,
        setNewsTitle
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};