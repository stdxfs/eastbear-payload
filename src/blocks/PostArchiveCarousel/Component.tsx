import type { Post, PostArchiveCarouselBlock as PostArchiveCarouselBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { GSAPAnimate } from '@/components/ui/gsap-animate'

import { PostCarousel } from './Carousel'

export const PostArchiveCarouselBlock: React.FC<
  PostArchiveCarouselBlockProps & {
    id?: string
    enableStagger?: boolean
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    carouselOptions,
    enableStagger,
  } = props

  const limit = limitFromProps || 9

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  if (!posts || posts.length === 0) return null

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent &&
        (enableStagger ? (
          <GSAPAnimate animation="fadeInUp" delay={0} className="container mb-8">
            <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
          </GSAPAnimate>
        ) : (
          <div className="container mb-8">
            <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
          </div>
        ))}
      <PostCarousel
        posts={posts}
        showDots={carouselOptions?.showDots ?? false}
        autoPlay={carouselOptions?.autoPlay ?? false}
        autoPlayDelay={carouselOptions?.autoPlayDelay ?? 4000}
        loop={carouselOptions?.loop ?? true}
      />
    </div>
  )
}
