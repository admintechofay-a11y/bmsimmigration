import React from 'react';

/**
 * High-performance responsive image component with explicit dimensions,
 * lazy-loading, and priority control.
 */
export default function ResponsivePicture({
  src,
  alt = '',
  width,
  height,
  className = '',
  priority = false,
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // @ts-ignore
      fetchpriority={priority ? 'high' : 'auto'}
      className={className}
    />
  );
}
