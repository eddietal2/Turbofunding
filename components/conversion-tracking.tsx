"use client"

import { useEffect } from "react"

interface ConversionTrackingProps {
  eventName: string
  eventData?: Record<string, any>
  value?: number
  currency?: string
}

export function ConversionTracking({ eventName, eventData = {}, value, currency = "USD" }: ConversionTrackingProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Google Analytics 4 Event
        if (typeof (window as any).gtag !== "undefined") {
          ;(window as any).gtag("event", eventName, {
            event_category: "business_funding",
            event_label: "turbofunding",
            value: value,
            currency: currency,
            ...eventData,
          })
        }

        // Facebook Pixel Event
        if (typeof (window as any).fbq !== "undefined") {
          if (value) {
            ;(window as any).fbq("track", eventName, {
              value: value,
              currency: currency,
              content_category: "business_funding",
              ...eventData,
            })
          } else {
            ;(window as any).fbq("track", eventName, eventData)
          }
        }

        // LinkedIn Conversion
        if (typeof (window as any).lintrk !== "undefined") {
          ;(window as any).lintrk("track", { conversion_id: eventName })
        }

        // TikTok Pixel Event
        if (typeof (window as any).ttq !== "undefined") {
          ;(window as any).ttq.track(eventName, {
            value: value,
            currency: currency,
            content_category: "business_funding",
            ...eventData,
          })
        }

        // Twitter Conversion
        if (typeof (window as any).twq !== "undefined") {
          ;(window as any).twq("track", eventName, {
            value: value ? value.toString() : undefined,
            currency: currency,
            ...eventData,
          })
        }

        // Snapchat Conversion
        if (typeof (window as any).snaptr !== "undefined") {
          ;(window as any).snaptr("track", eventName, {
            price: value,
            currency: currency,
            ...eventData,
          })
        }

        // Pinterest Conversion
        if (typeof (window as any).pintrk !== "undefined") {
          ;(window as any).pintrk("track", eventName, {
            value: value,
            currency: currency,
            ...eventData,
          })
        }

        // Microsoft UET Event
        if (typeof (window as any).uetq !== "undefined") {
          ;(window as any).uetq.push("event", eventName, {
            revenue_value: value,
            currency: currency,
            ...eventData,
          })
        }

        // Reddit Pixel Event
        if (typeof (window as any).rdt !== "undefined") {
          ;(window as any).rdt("track", eventName, {
            value: value,
            currency: currency,
            ...eventData,
          })
        }

        // Mixpanel Event (only if properly initialized)
        if (typeof (window as any).mixpanel !== "undefined" && (window as any).mixpanel.track) {
          ;(window as any).mixpanel.track(eventName, {
            value: value,
            currency: currency,
            page: window.location.pathname,
            ...eventData,
          })
        }

        // Hotjar Event (only if properly initialized)
        if (typeof (window as any).hj !== "undefined") {
          ;(window as any).hj("event", eventName)
        }
      } catch (error) {
        console.warn("Conversion tracking error:", error)
      }
    }
  }, [eventName, eventData, value, currency])

  return null
}
