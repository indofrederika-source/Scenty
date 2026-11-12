"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export type FloatingDockItem = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2 items-center"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.onClick ? (
                  <button
                    type="button"
                    onClick={() => {
                      item.onClick?.();
                      setOpen(false);
                    }}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full shadow-lg border transition-all cursor-pointer",
                      item.active
                        ? "bg-amber-500 text-zinc-950 border-amber-300"
                        : "bg-zinc-900 text-zinc-300 border-white/20 hover:text-white"
                    )}
                  >
                    <div className="h-5 w-5 flex items-center justify-center">{item.icon}</div>
                  </button>
                ) : (
                  <a
                    href={item.href || "#"}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full shadow-lg border transition-all cursor-pointer",
                      item.active
                        ? "bg-amber-500 text-zinc-950 border-amber-300"
                        : "bg-zinc-900 text-zinc-300 border-white/20 hover:text-white"
                    )}
                  >
                    <div className="h-5 w-5 flex items-center justify-center">{item.icon}</div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950/90 border border-white/20 shadow-2xl text-amber-400 cursor-pointer"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-3 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/20 shadow-2xl px-3 pb-3 md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  active,
}: FloatingDockItem & {
  mouseX: MotionValue;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [42, 70, 42]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [42, 70, 42]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 34, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 34, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const inner = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full transition-colors cursor-pointer select-none",
        active
          ? "bg-amber-500 text-zinc-950 ring-2 ring-amber-300 shadow-lg"
          : "bg-zinc-900 border border-white/15 text-zinc-400 hover:text-white hover:bg-zinc-800"
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-9 left-1/2 w-fit rounded-lg border border-amber-500/40 bg-zinc-950/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold whitespace-pre text-amber-400 shadow-2xl"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="outline-none focus:outline-none">
        {inner}
      </button>
    );
  }

  return <a href={href || "#"}>{inner}</a>;
}
