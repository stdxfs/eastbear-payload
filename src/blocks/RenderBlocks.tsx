import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PostArchiveCarouselBlock } from '@/blocks/PostArchiveCarousel/Component'
import { GSAPAnimate } from '@/components/ui/gsap-animate'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  postArchiveCarousel: PostArchiveCarouselBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  enableStagger?: boolean
}> = (props) => {
  const { blocks, enableStagger = false } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              if (enableStagger) {
                return (
                  <div key={index} className="my-16">
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} disableInnerContainer enableStagger />
                  </div>
                )
              }

              return (
                <GSAPAnimate
                  key={index}
                  animation="fadeInUp"
                  delay={index * 0.05}
                  className="my-16"
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </GSAPAnimate>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
