import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { GSAPAnimate } from '@/components/ui/gsap-animate'

export const ContentBlock: React.FC<ContentBlockProps & { enableStagger?: boolean }> = (props) => {
  const { columns, enableStagger } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            const columnClassName = cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
              'md:col-span-2': size !== 'full',
            })

            const columnContent = (
              <>
                {richText && <RichText data={richText} enableGutter={false} />}
                {enableLink && <CMSLink {...link} />}
              </>
            )

            if (enableStagger) {
              return (
                <GSAPAnimate
                  key={index}
                  animation="fadeInUp"
                  delay={index * 0.12}
                  className={columnClassName}
                >
                  {columnContent}
                </GSAPAnimate>
              )
            }

            return (
              <div className={columnClassName} key={index}>
                {columnContent}
              </div>
            )
          })}
      </div>
    </div>
  )
}
