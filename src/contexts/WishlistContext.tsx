"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { MoodBoard } from "@/lib/types";

interface WishlistContextValue {
  boards: MoodBoard[];
  activeBoard: string;
  setActiveBoard: (id: string) => void;
  addItem: (productId: string, boardId?: string) => void;
  removeItem: (productId: string, boardId?: string) => void;
  isInWishlist: (productId: string) => boolean;
  createBoard: (name: string) => void;
  deleteBoard: (id: string) => void;
  toggleShare: (boardId: string) => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const DEFAULT_BOARD: MoodBoard = {
  id: "default",
  name: "My Favorites",
  items: [],
  createdAt: new Date(),
  shared: false,
};

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<MoodBoard[]>([DEFAULT_BOARD]);
  const [activeBoard, setActiveBoard] = useState("default");

  const addItem = useCallback(
    (productId: string, boardId?: string) => {
      const targetId = boardId || activeBoard;
      setBoards((prev) =>
        prev.map((b) =>
          b.id === targetId && !b.items.some((i) => i.productId === productId)
            ? {
                ...b,
                items: [
                  ...b.items,
                  { productId, addedAt: new Date() },
                ],
              }
            : b
        )
      );
    },
    [activeBoard]
  );

  const removeItem = useCallback(
    (productId: string, boardId?: string) => {
      const targetId = boardId || activeBoard;
      setBoards((prev) =>
        prev.map((b) =>
          b.id === targetId
            ? {
                ...b,
                items: b.items.filter((i) => i.productId !== productId),
              }
            : b
        )
      );
    },
    [activeBoard]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return boards.some((b) =>
        b.items.some((i) => i.productId === productId)
      );
    },
    [boards]
  );

  const createBoard = useCallback((name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    setBoards((prev) => [
      ...prev,
      { id, name, items: [], createdAt: new Date(), shared: false },
    ]);
    setActiveBoard(id);
  }, []);

  const deleteBoard = useCallback(
    (id: string) => {
      if (id === "default") return;
      setBoards((prev) => prev.filter((b) => b.id !== id));
      if (activeBoard === id) setActiveBoard("default");
    },
    [activeBoard]
  );

  const toggleShare = useCallback((boardId: string) => {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId ? { ...b, shared: !b.shared } : b
      )
    );
  }, []);

  const totalItems = boards.reduce((sum, b) => sum + b.items.length, 0);

  return (
    <WishlistContext.Provider
      value={{
        boards,
        activeBoard,
        setActiveBoard,
        addItem,
        removeItem,
        isInWishlist,
        createBoard,
        deleteBoard,
        toggleShare,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
