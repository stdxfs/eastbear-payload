import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const PostArchiveCarousel: Block = {
  slug: 'postArchiveCarousel',
  interfaceName: 'PostArchiveCarouselBlock',
  labels: {
    plural: 'Post Archive Carousels',
    singular: 'Post Archive Carousel',
  },
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        { label: 'Collection', value: 'collection' },
        { label: 'Individual Selection', value: 'selection' },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: 'Collections To Show',
      options: [{ label: 'Posts', value: 'posts' }],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 9,
      label: 'Limit',
      min: 3,
      max: 20,
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['posts'],
    },
    {
      name: 'carouselOptions',
      type: 'group',
      label: 'Carousel Options',
      fields: [
        {
          name: 'showDots',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show Navigation Dots',
        },
        {
          name: 'autoPlay',
          type: 'checkbox',
          defaultValue: false,
          label: 'Auto-play',
        },
        {
          name: 'autoPlayDelay',
          type: 'number',
          admin: {
            condition: (_, siblingData) => siblingData.autoPlay,
            step: 500,
          },
          defaultValue: 4000,
          label: 'Auto-play Delay (ms)',
          min: 1000,
          max: 10000,
        },
        {
          name: 'loop',
          type: 'checkbox',
          defaultValue: true,
          label: 'Loop Carousel',
        },
      ],
    },
  ],
}
