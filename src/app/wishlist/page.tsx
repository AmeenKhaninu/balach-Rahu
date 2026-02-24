"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { getProductById, formatPrice } from "@/lib/data/products";
import { Navbar } from "@/components/sections";
import {
  Label,
  SectionHeading,
  AccentText,
  Body,
  Badge,
  Button,
  Card,
  CardHeading,
  MonoText,
  Input,
} from "@/components/ui";

export default function WishlistPage() {
  const { language } = useTheme();
  const {
    boards,
    activeBoard,
    setActiveBoard,
    removeItem,
    createBoard,
    deleteBoard,
    toggleShare,
    totalItems,
  } = useWishlist();
  const [newBoardName, setNewBoardName] = useState("");
  const [showNewBoard, setShowNewBoard] = useState(false);

  const currentBoard = boards.find((b) => b.id === activeBoard) || boards[0];
  const boardProducts = currentBoard.items
    .map((item) => ({
      ...item,
      product: getProductById(item.productId),
    }))
    .filter((item) => item.product);

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      createBoard(newBoardName.trim());
      setNewBoardName("");
      setShowNewBoard(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-primary transition-all duration-500">
      <Navbar />

      <div className="pt-28 pb-24 px-8 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Label className="mb-3 block">
            {language === "en" ? "Your Mood Boards" : "آپ کے موڈ بورڈز"}
          </Label>
          <SectionHeading>
            {language === "en" ? (
              <>
                Curate Your <AccentText>Vision</AccentText>
              </>
            ) : (
              <>
                اپنا <AccentText>وژن</AccentText> ترتیب دیں
              </>
            )}
          </SectionHeading>
          <Body className="mt-3 max-w-[560px]">
            {language === "en"
              ? "Build mood boards, mix and match pieces, and share with family for feedback. This is how real fashion shopping works."
              : "موڈ بورڈز بنائیں، لباس ملائیں، اور خاندان کے ساتھ شیئر کریں۔"}
          </Body>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Board Sidebar */}
          <div className="space-y-3">
            <Label className="block mb-2">
              {language === "en" ? "Boards" : "بورڈز"} ({boards.length})
            </Label>
            {boards.map((board) => (
              <motion.div
                key={board.id}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-all duration-300
                  ${
                    board.id === activeBoard
                      ? "border-brand-gold bg-brand-gold/5"
                      : "border-theme hover:border-brand-gold/30"
                  }
                `}
                onClick={() => setActiveBoard(board.id)}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-theme-primary">
                    {board.name}
                  </span>
                  <span className="font-mono text-[10px] text-theme-tertiary">
                    {board.items.length}
                  </span>
                </div>
                {board.shared && (
                  <span className="font-body text-[9px] text-brand-gold uppercase tracking-[1px]">
                    Shared
                  </span>
                )}
              </motion.div>
            ))}

            {/* New Board */}
            {showNewBoard ? (
              <div className="space-y-2">
                <Input
                  placeholder={
                    language === "en"
                      ? "Board name..."
                      : "بورڈ کا نام..."
                  }
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateBoard()}
                />
                <div className="flex gap-2">
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={handleCreateBoard}
                  >
                    Create
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNewBoard(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setShowNewBoard(true)}
              >
                + New Board
              </Button>
            )}
          </div>

          {/* Board Content */}
          <div>
            {/* Board Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <CardHeading>{currentBoard.name}</CardHeading>
                <span className="font-mono text-[11px] text-theme-tertiary">
                  {currentBoard.items.length}{" "}
                  {language === "en" ? "pieces" : "اشیاء"}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={currentBoard.shared ? "gold" : "ghost"}
                  size="sm"
                  onClick={() => toggleShare(currentBoard.id)}
                >
                  {currentBoard.shared
                    ? language === "en"
                      ? "Shared ✓"
                      : "شیئر شدہ ✓"
                    : language === "en"
                    ? "Share Board"
                    : "بورڈ شیئر کریں"}
                </Button>
                {currentBoard.id !== "default" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteBoard(currentBoard.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {boardProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {boardProducts.map(({ product, productId }, i) => {
                  if (!product) return null;
                  return (
                    <motion.div
                      key={productId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                      <Card variant="default" className="relative group">
                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(productId)}
                          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer border-none"
                        >
                          ✕
                        </button>
                        <Link
                          href={`/products/${product.slug}`}
                          className="no-underline"
                        >
                          <div
                            className="aspect-[3/4] rounded-t-lg"
                            style={{
                              background:
                                product.images[0]?.gradient ||
                                "var(--bg-tertiary)",
                            }}
                          />
                          <div className="p-3">
                            <Badge
                              variant="occasion"
                              occasion={product.occasion}
                              className="mb-1"
                            >
                              {product.occasion}
                            </Badge>
                            <CardHeading className="text-sm">
                              {language === "en"
                                ? product.name
                                : product.nameUr}
                            </CardHeading>
                            <MonoText>{formatPrice(product.price)}</MonoText>
                          </div>
                        </Link>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                className="text-center py-20 border border-dashed border-theme rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-4xl mb-4 block">♡</span>
                <CardHeading>
                  {language === "en"
                    ? "This board is empty"
                    : "یہ بورڈ خالی ہے"}
                </CardHeading>
                <Body className="mt-2 max-w-[400px] mx-auto">
                  {language === "en"
                    ? "Browse our collections and save pieces you love to build your perfect look."
                    : "ہماری کلیکشنز دیکھیں اور پسندیدہ لباس محفوظ کریں۔"}
                </Body>
                <Link href="/shop" className="inline-block mt-4">
                  <Button variant="secondary" size="sm">
                    {language === "en" ? "Start Shopping" : "خریداری شروع کریں"}{" "}
                    →
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
