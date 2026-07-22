import React from "react";

export default function SkeletonLoader({ count = 3, height = "120px" }) {
  return (
    <div className="skeleton-container" style={{ display: "grid", gap: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton-pulse"
          style={{
            height,
            width: "100%",
            borderRadius: 22,
            background: "linear-gradient(90deg, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 75%)",
            backgroundSize: "200% 100%",
            animation: "skeletonShimmer 1.5s infinite",
          }}
        />
      ))}
    </div>
  );
}
