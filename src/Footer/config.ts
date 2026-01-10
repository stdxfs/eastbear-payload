import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // Contact Information Group
    {
      type: 'group',
      name: 'contactInfo',
      label: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '+1 (555) 123-4567',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          defaultValue: 'info@eastbeartravel.com',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
          defaultValue: '123 Travel Street, Suite 100\nNew York, NY 10001',
        },
      ],
    },
    // Social Links Group
    {
      type: 'group',
      name: 'socialLinks',
      label: 'Social Media Links',
      fields: [
        {
          name: 'facebookUrl',
          type: 'text',
          label: 'Facebook URL',
          defaultValue: 'https://facebook.com',
        },
        {
          name: 'linkedinUrl',
          type: 'text',
          label: 'LinkedIn URL',
          defaultValue: 'https://linkedin.com',
        },
      ],
    },
    // Contact Us Section
    {
      type: 'group',
      name: 'contactSection',
      label: 'Contact Us Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Contact Us',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue:
            'East Bear Travel is your trusted partner for unforgettable journeys. With years of experience in crafting personalized travel experiences, we are dedicated to making your dream vacation a reality.\n\nOur team of expert travel consultants is available to assist you with all your travel needs, from planning to booking and beyond. We pride ourselves on delivering exceptional service and creating memories that last a lifetime.',
        },
      ],
    },
    // Bottom Row Section
    {
      type: 'group',
      name: 'bottomRow',
      label: 'Bottom Row',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Copyright Text',
          defaultValue: 'East Bear Travel',
        },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Legal Links',
          maxRows: 4,
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
          },
        },
        {
          name: 'paymentLogos',
          type: 'array',
          label: 'Payment/Certification Logos',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'alt',
              type: 'text',
              label: 'Alt Text',
              defaultValue: 'Payment method',
            },
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
