import { getCachedGlobal } from '@/utilities/getGlobals'
import Image from 'next/image'
import React from 'react'
import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react'

import type { Footer, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'

interface ContactInfoItemProps {
  icon: React.ElementType
  children: React.ReactNode
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon: Icon, children }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      <Icon className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
    </div>
    <div className="text-brand-wine text-sm leading-relaxed pt-2">{children}</div>
  </div>
)

interface SocialButtonProps {
  href: string
  icon: React.ElementType
  label: string
  color: string
}

const SocialButton: React.FC<SocialButtonProps> = ({ href, icon: Icon, label, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
  >
    <Icon className={`w-5 h-5 ${color}`} />
  </a>
)

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const { contactInfo, socialLinks, contactSection, bottomRow } = footerData || {}

  const phone = contactInfo?.phone || '+1 (555) 123-4567'
  const email = contactInfo?.email || 'info@eastbeartravel.com'
  const address = contactInfo?.address || '123 Travel Street, Suite 100\nNew York, NY 10001'

  const facebookUrl = socialLinks?.facebookUrl || 'https://facebook.com'
  const linkedinUrl = socialLinks?.linkedinUrl || 'https://linkedin.com'

  const contactTitle = contactSection?.title || 'Contact Us'
  const contactDescription =
    contactSection?.description ||
    'East Bear Travel is your trusted partner for unforgettable journeys. With years of experience in crafting personalized travel experiences, we are dedicated to making your dream vacation a reality.\n\nOur team of expert travel consultants is available to assist you with all your travel needs, from planning to booking and beyond. We pride ourselves on delivering exceptional service and creating memories that last a lifetime.'

  const copyrightText = bottomRow?.copyrightText || 'East Bear Travel'
  const legalLinks = bottomRow?.legalLinks || []
  const paymentLogos = bottomRow?.paymentLogos || []

  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-[#f5f6f7]">
      {/* Main Content */}
      <div className="container py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-5">
            <ContactInfoItem icon={Phone}>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:underline">
                {phone}
              </a>
            </ContactInfoItem>

            <ContactInfoItem icon={Mail}>
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </ContactInfoItem>

            <ContactInfoItem icon={MapPin}>
              <span className="whitespace-pre-line">{address}</span>
            </ContactInfoItem>

            {/* Social Buttons */}
            <div className="flex gap-3 pt-4">
              <SocialButton
                href={facebookUrl}
                icon={Facebook}
                label="Follow us on Facebook"
                color="text-[#1877F2]"
              />
              <SocialButton
                href={linkedinUrl}
                icon={Linkedin}
                label="Connect on LinkedIn"
                color="text-[#0A66C2]"
              />
            </div>
          </div>

          {/* Right Column - Contact Us Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{contactTitle}</h3>
            <div className="text-gray-600 text-sm leading-relaxed space-y-4">
              {contactDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} <span className="font-bold">{copyrightText}</span>
            </p>

            {/* Legal Links */}
            {legalLinks.length > 0 && (
              <nav className="flex items-center gap-2 text-sm text-gray-500">
                {legalLinks.map(({ link }, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="text-gray-300">•</span>}
                    <CMSLink {...link} className="hover:text-gray-700 transition-colors" />
                  </React.Fragment>
                ))}
              </nav>
            )}

            {/* Payment Logos */}
            {paymentLogos.length > 0 && (
              <div className="flex items-center gap-3">
                {paymentLogos.map((item, index) => {
                  const logo = item.logo as Media
                  if (!logo?.url) return null
                  return (
                    <Image
                      key={index}
                      src={logo.url}
                      alt={item.alt || 'Payment method'}
                      width={40}
                      height={24}
                      className="h-6 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
