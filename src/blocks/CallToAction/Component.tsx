import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { GSAPAnimate } from '@/components/ui/gsap-animate'

export const CallToActionBlock: React.FC<CTABlockProps & { enableStagger?: boolean }> = ({
  links,
  richText,
  enableStagger,
}) => {
  const content = (
    <>
      {enableStagger ? (
        <GSAPAnimate
          animation="fadeInUp"
          delay={0}
          className="max-w-[48rem] flex items-center"
        >
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </GSAPAnimate>
      ) : (
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
      )}
      {enableStagger ? (
        <GSAPAnimate
          animation="fadeInUp"
          delay={0.15}
          className="flex flex-col gap-8"
        >
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </GSAPAnimate>
      ) : (
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      )}
    </>
  )

  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
          {content}
        </div>
      </div>
    </div>
  )
}
