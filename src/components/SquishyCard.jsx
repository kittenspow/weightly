import React from "react";
import { motion } from "framer-motion";

const SquishyCard = ({ children, className, title, icon: Icon }) => {

  return (
    <div className="mx-auto w-fit">
      <motion.div
        whileHover="hover"
        transition={{
          duration: 1,
          ease: "backInOut",
        }}
        variants={{
          hover: {
            scale: 1.05,
          },
        }}
        className={`relative h-80 w-72 shrink-0 overflow-hidden rounded-xl bg-primary-blue p-7 ${className}`}
      >
        <div className="relative z-10 text-white">
          {/* icon card, dirender jika prop 'icon' diberikan */}
          {Icon && (
            <motion.div
              initial={{ scale: 0.85 }}
              variants={{
                hover: {
                  scale: 1,
                },
              }}
              transition={{
                duration: 1,
                ease: "backInOut",
              }}
              className="mb-1"
            >
              {/* render komponen ikon yang diterima */}
              <Icon className="w-12 h-12" /> 
            </motion.div>
          )}

          {/* judul card, bisa diubah via prop 'title' */}
          {title && (
            <motion.span
              initial={{ scale: 0.85 }}
              variants={{
                hover: {
                  scale: 1,
                },
              }}
              transition={{
                duration: 1,
                ease: "backInOut",
              }}
              className="my-2 block origin-top-left font-poppins text-3xl font-bold leading-[1.2]"
            >
              {title}
            </motion.span>
          )}

          {children ? (
            <p>{children}</p>
          ) : (

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, rem.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SquishyCard;
