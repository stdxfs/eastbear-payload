import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topBar',
      type: 'group',
      label: 'Top Bar Settings',
      fields: [
        {
          name: 'phoneNumber',
          type: 'text',
          label: 'Phone Number (with country code)',
          admin: {
            placeholder: '+1234567890',
            description: 'Phone number for WhatsApp link (include country code, no spaces)',
          },
        },
        {
          name: 'phoneDisplay',
          type: 'text',
          label: 'Phone Display Text',
          admin: {
            placeholder: '+1 (234) 567-890',
            description: 'How the phone number appears on the website',
          },
        },
        {
          name: 'languages',
          type: 'array',
          label: 'Available Languages',
          minRows: 1,
          maxRows: 10,
          fields: [
            {
              name: 'code',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'en',
                description: 'Language code (e.g., en, zh, es)',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'English',
                description: 'Display name for the language',
              },
            },
            {
              name: 'flag',
              type: 'text',
              admin: {
                placeholder: 'US',
                description: 'Country code for flag (e.g., US, CN, ES)',
              },
            },
          ],
        },
        {
          name: 'defaultLanguage',
          type: 'text',
          label: 'Default Language Code',
          defaultValue: 'en',
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
