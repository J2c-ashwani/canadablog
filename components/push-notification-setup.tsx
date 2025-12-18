"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, BellOff, CheckCircle } from "lucide-react"

export function PushNotificationSetup() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported("Notification" in window)
    if ("Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!isSupported) return

    try {
      const result = await Notification.requestPermission()
      setPermission(result)

      if (result === "granted") {
        // Send a test notification
        new Notification("Grant Alerts Enabled!", {
          body: "You'll now receive notifications about new grant opportunities.",
          icon: "/favicon.ico",
        })

        // Store preference
        localStorage.setItem("grant-notifications", "enabled")
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error)
    }
  }

  const disableNotifications = () => {
    localStorage.setItem("grant-notifications", "disabled")
    setPermission("denied")
  }

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="h-5 w-5" />
            Push Notifications Not Supported
          </CardTitle>
          <CardDescription>
            Your browser doesn't support push notifications. Consider upgrading to a modern browser.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (permission === "granted") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Grant Alerts Enabled
          </CardTitle>
          <CardDescription className="text-green-700">
            You'll receive notifications about new grant opportunities and deadlines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={disableNotifications}
            className="border-green-300 text-green-800 hover:bg-green-100 bg-transparent"
          >
            <BellOff className="mr-2 h-4 w-4" />
            Disable Notifications
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Enable Grant Alerts
        </CardTitle>
        <CardDescription>
          Get instant notifications about new grant opportunities, deadline reminders, and funding updates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2">You'll receive notifications for:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>New grant opportunities matching your interests</li>
              <li>Upcoming application deadlines</li>
              <li>Important funding program updates</li>
              <li>Weekly grant roundups</li>
            </ul>
          </div>
          <Button onClick={requestPermission} className="w-full">
            <Bell className="mr-2 h-4 w-4" />
            Enable Push Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
