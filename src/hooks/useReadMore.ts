import { useState } from 'react';

interface ReadMoreHook {
  hasMore: boolean;
  isExpanded: boolean;
  showLess: () => void;
  showMore: () => void;
  displayText: string;
}

export const useReadMore = (text: string, initialWords: number): ReadMoreHook => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(() => {
    const words = text.split(' ');
    if (words.length <= initialWords) {
      return text;
    }
    return words.slice(0, initialWords).join(' ');
  });

  const hasMore = text.split(' ').length > initialWords;

  const showMore = () => {
    setIsExpanded(true);
    setDisplayText(text);
  };

  const showLess = () => {
    setIsExpanded(false);
    setDisplayText(text.split(' ').slice(0, initialWords).join(' '));
  };

  return {
    hasMore,
    isExpanded,
    showLess,
    showMore,
    displayText
  };
};

