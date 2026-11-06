
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

/* eslint-disable react-refresh/only-export-components */

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const { user } = useAuth();

  // Store saved articles separately for each username.
  const [allUserArticles, setAllUserArticles] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('newsreaderSavedArticles')
      ) || {};
    } catch {
      return {};
    }
  });

  // Save changes to browser storage.
  useEffect(() => {
    localStorage.setItem(
      'newsreaderSavedArticles',
      JSON.stringify(allUserArticles)
    );
  }, [allUserArticles]);

  const username = user?.username;
  const savedArticles = username
    ? allUserArticles[username] || []
    : [];

  const saveArticle = (article) => {
    if (!username) return;

    if (savedArticles.some((item) => item.url === article.url)) {
      return;
    }

    setAllUserArticles((previous) => ({
      ...previous,
      [username]: [
        ...(previous[username] || []),
        article
      ]
    }));
  };

  const removeArticle = (url) => {
    if (!username) return;

    setAllUserArticles((previous) => ({
      ...previous,
      [username]: (previous[username] || []).filter(
        (article) => article.url !== url
      )
    }));
  };

  const isArticleSaved = (url) => {
    return savedArticles.some((article) => article.url === url);
  };

  return (
    <ArticlesContext.Provider
      value={{
        savedArticles,
        allUserArticles,
        saveArticle,
        removeArticle,
        isArticleSaved
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const context = useContext(ArticlesContext);

  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }

  return context;
}
