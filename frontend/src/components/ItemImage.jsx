import React from "react";

const ItemImage = ({ src, alt, label = "No Image", className = "", imageClassName = "" }) => {
  const hasImage = Boolean(src && src.trim());

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      ) : (
        <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(226,232,240,0.95))]">
          <div className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-bold uppercase tracking-[0.28em] text-slate-500 shadow-sm">
            {label}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemImage;