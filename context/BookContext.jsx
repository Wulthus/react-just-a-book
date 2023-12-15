import { createContext, useContext } from 'react';

export const BookContext = createContext(null);

export function useBook() {
  const bookContext = useContext(BookContext);
  if (BookContext === null) console.log("Did you just use BookContext outisde of BookContext.Provider?");
  return bookContext;
}