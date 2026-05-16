import { useEffect, useRef, useState } from "react";
import useInView from "@/components/useInView";

export default function ItemFadeIn({ children, delay = 0, direction = "up", className = "" }) {
    const [ref, inView] = useInView();
    const transforms = {
        up: "translateY(32px)",
        down: "translateY(-32px)",
        left: "translateX(-32px)",
        right: "translateX(32px)",
    };
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : transforms[direction],
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}
