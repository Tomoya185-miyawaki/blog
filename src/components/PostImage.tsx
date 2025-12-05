'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PostImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export default function PostImage({ 
  src, 
  alt, 
  className = '',
  width = 800,
  height = 400
}: PostImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => {
        setImgSrc('/images/default-thumbnail.svg')
      }}
      unoptimized
    />
  )
}
