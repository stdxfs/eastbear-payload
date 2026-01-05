"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

interface CookieConsentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAccept: () => void
  onReject: () => void
  hasConsented: boolean
}

export function CookieConsentDialog({
  open,
  onOpenChange,
  onAccept,
  onReject,
  hasConsented,
}: CookieConsentDialogProps) {
  const handleAccept = () => {
    onAccept()
    onOpenChange(false)
  }

  const handleReject = () => {
    onReject()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Cookie Settings</DialogTitle>
          <DialogDescription>
            Manage your cookie preferences below.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="necessary">Necessary</TabsTrigger>
            <TabsTrigger value="optout">Opt-out</TabsTrigger>
          </TabsList>

          <TabsContent value="privacy" className="mt-4 space-y-4">
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                We value your privacy and are committed to protecting your personal data.
                This policy explains how we collect, use, and safeguard your information
                when you visit our website.
              </p>
              <p>
                <strong>What we collect:</strong> We may collect information about your
                browsing behavior, device type, and preferences to improve your experience.
              </p>
              <p>
                <strong>How we use it:</strong> The data helps us analyze site traffic,
                personalize content, and enhance our services.
              </p>
              <p>
                <strong>Your rights:</strong> You have the right to access, modify, or
                delete your data at any time. Use the Opt-out tab to manage your preferences.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="necessary" className="mt-4 space-y-4">
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                <strong>Strictly Necessary Cookies</strong> are essential for the website
                to function properly. These cookies cannot be disabled.
              </p>
              <div className="rounded-md border p-3 space-y-2">
                <div>
                  <p className="font-medium text-foreground">Session Cookie</p>
                  <p className="text-xs">Maintains your session while browsing the site.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Authentication Token</p>
                  <p className="text-xs">Keeps you logged in securely.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Cookie Consent</p>
                  <p className="text-xs">Remembers your cookie preferences.</p>
                </div>
              </div>
              <p>
                These cookies do not store any personally identifiable information and
                are required for basic site functionality.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="optout" className="mt-4 space-y-4">
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                You can choose to opt out of non-essential cookies. This will disable
                analytics and personalization features.
              </p>
              {hasConsented ? (
                <p className="text-success font-medium">
                  You have accepted cookies.
                </p>
              ) : (
                <p className="text-warning font-medium">
                  You have opted out of non-essential cookies.
                </p>
              )}
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={handleReject} className="flex-1">
                Reject All
              </Button>
              <Button onClick={handleAccept} className="flex-1">
                Accept All
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
