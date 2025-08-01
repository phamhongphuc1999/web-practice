import { motion, Transition } from 'motion/react';
import React, { ReactNode } from 'react';
import { DivProps } from 'src/global';
import { cn } from 'src/lib/utils';

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
} as Transition;

interface MenuItemProps extends DivProps {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: ReactNode;
}

export function MenuItem({ setActive, active, item, children, ...props }: MenuItemProps) {
  return (
    <div
      {...props}
      onMouseEnter={() => setActive(item)}
      className={cn('relative', props.className)}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 -translate-x-1/2 transform pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="overflow-hidden rounded-2xl border border-black/[0.2] bg-white shadow-xl backdrop-blur-sm dark:border-white/[0.2] dark:bg-black"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="h-full w-max p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

interface MenuProps extends DivProps {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}

export function Menu({ setActive, children, ...props }: MenuProps) {
  return (
    <nav
      {...props}
      onMouseLeave={() => setActive(null)} // resets the state
      className={cn(
        'shadow-input relative flex justify-center space-x-4 rounded-full border border-transparent bg-white px-8 py-6 dark:border-white/[0.2] dark:bg-black',
        props.className
      )}
    >
      {children}
    </nav>
  );
}
