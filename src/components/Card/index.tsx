'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group rounded-2xl overflow-hidden bg-card hover:cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full overflow-hidden">
        {!metaImage && <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <div className="transition-transform duration-500 group-hover:scale-105">
            <Media resource={metaImage} size="33vw" />
          </div>
        )}
      </div>
      <div className="p-5">
        {showCategories && hasCategories && (
          <div className="uppercase text-xs font-medium tracking-wider text-muted-foreground mb-3">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <h3 className="text-lg font-semibold leading-tight">
            <Link
              className="hover:text-primary transition-colors duration-200"
              href={href}
              ref={link.ref}
            >
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{sanitizedDescription}</p>
        )}
      </div>
    </article>
  )
}
