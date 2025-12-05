'use client'

interface PostImageProps {
  src: string
  alt: string
  className?: string
}

export default function PostImage({ src, alt, className = '' }: PostImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = '/images/default-thumbnail.svg'
      }}
    />
  )
}
