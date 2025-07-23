import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import useLikeStore from "@/lib/store/like";
import { addWishListProductToDB, removeWishListProductFromDB } from "@/lib/api";

export default function Like({ id }: { id: number }) {
  const { likes, addLike, removeLike } = useLikeStore();

  const [like, setLike] = useState(likes.includes(id));
  const [showBubble, setShowBubble] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setLike(likes.includes(id));
  }, [likes]);

  function handleLike() {
    if (like) {
      removeLike(id);

      if (user) {
        removeWishListProductFromDB(id, user.user.id);
      }
    } else {
      addLike(id);
      if (user) {
        addWishListProductToDB(id, user.user.id);
      }
    }
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            data-testid="like-bubble"
            className="absolute -translate-x-1/2 "
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -40 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <HeartIcon className="text-red-400 fill-red-400 opacity-70 w-10 h-10" />
          </motion.div>
        )}
      </AnimatePresence>
      <HeartIcon
        data-testid="like-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLike(!like);
          setShowBubble(!showBubble);
          setTimeout(() => setShowBubble(false), 300);
          handleLike();
        }}
        className={` cursor-pointer hover:fill-red-500 hover:text-red-500 ${
          like && "fill-red-500 text-red-500"
        }`}
      />
    </div>
  );
}
