import type { Block, Field } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import {
  TextColorFeature,
  TextSizeFeature,
  TextLetterSpacingFeature,
  TextLineHeightFeature,
  TextFontFamilyFeature,
} from 'payload-lexical-typography'

import { link } from '@/fields/link'
import { MediaBlock } from '../MediaBlock/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BlocksFeature({ blocks: [MediaBlock] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          // Typography features
          TextColorFeature({
            colors: [
              { value: '#476B47', label: 'Green' },
              { value: '#193818', label: 'Green Dark' },
              { value: '#C9A227', label: 'Gold' },
              { value: '#F7E7CE', label: 'Champagne' },
              { value: '#8B2346', label: 'Wine' },
              { value: '#000000', label: 'Black' },
              { value: '#666666', label: 'Gray' },
              { value: '#FFFFFF', label: 'White' },
            ],
            colorPicker: true,
          }),
          TextSizeFeature({
            sizes: [
              { value: '0.875rem', label: 'Small' },
              { value: '1rem', label: 'Base' },
              { value: '1.125rem', label: 'Large' },
              { value: '1.25rem', label: 'XL' },
              { value: '1.5rem', label: '2XL' },
              { value: '2rem', label: '3XL' },
            ],
            customSize: true,
          }),
          TextLetterSpacingFeature({
            spacings: [
              { value: '-0.05em', label: 'Tight' },
              { value: '0', label: 'Normal' },
              { value: '0.05em', label: 'Wide' },
              { value: '0.1em', label: 'Wider' },
            ],
            customSpacing: true,
          }),
          TextLineHeightFeature({
            lineHeights: [
              { value: '1.25', label: 'Tight' },
              { value: '1.5', label: 'Normal' },
              { value: '1.75', label: 'Relaxed' },
              { value: '2', label: 'Loose' },
            ],
            customLineHeight: true,
          }),
          TextFontFamilyFeature({
            fontFamilies: [
              { value: 'var(--font-geist-sans)', label: 'Sans' },
              { value: 'var(--font-geist-mono)', label: 'Mono' },
              { value: 'Georgia, serif', label: 'Serif' },
            ],
            customFontFamily: true,
          }),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
