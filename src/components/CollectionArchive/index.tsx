import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { GSAPAnimate } from '@/components/ui/gsap-animate'

export type Props = {
  posts: CardPostData[]
  enableStagger?: boolean
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, enableStagger } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              const card = (
                <Card className="h-full" doc={result} relationTo="posts" showCategories />
              )

              if (enableStagger) {
                return (
                  <GSAPAnimate
                    key={index}
                    animation="fadeInUp"
                    delay={index * 0.08}
                    className="col-span-4"
                  >
                    {card}
                  </GSAPAnimate>
                )
              }

              return (
                <div className="col-span-4" key={index}>
                  {card}
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
