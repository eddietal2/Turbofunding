// Analytics utility functions for tracking events across platforms

export interface AnalyticsEvent {
  name: string
  parameters?: Record<string, any>
  value?: number
  currency?: string
}

export class Analytics {
  static track(event: AnalyticsEvent) {
    if (typeof window === "undefined") return

    const { name, parameters = {}, value, currency = "USD" } = event

    try {
      // Google Analytics 4
      if (typeof (window as any).gtag !== "undefined") {
        ;(window as any).gtag("event", name, {
          event_category: "business_funding",
          event_label: "turbofunding",
          value: value,
          currency: currency,
          ...parameters,
        })
      }

      // Facebook Pixel
      if (typeof (window as any).fbq !== "undefined") {
        if (value) {
          ;(window as any).fbq("track", name, {
            value: value,
            currency: currency,
            content_category: "business_funding",
            ...parameters,
          })
        } else {
          ;(window as any).fbq("track", name, parameters)
        }
      }

      // LinkedIn Insight Tag
      if (typeof (window as any).lintrk !== "undefined") {
        ;(window as any).lintrk("track", { conversion_id: name })
      }

      // TikTok Pixel
      if (typeof (window as any).ttq !== "undefined") {
        ;(window as any).ttq.track(name, {
          value: value,
          currency: currency,
          content_category: "business_funding",
          ...parameters,
        })
      }

      // Twitter Pixel
      if (typeof (window as any).twq !== "undefined") {
        ;(window as any).twq("track", name, {
          value: value ? value.toString() : undefined,
          currency: currency,
          ...parameters,
        })
      }

      // Snapchat Pixel
      if (typeof (window as any).snaptr !== "undefined") {
        ;(window as any).snaptr("track", name, {
          price: value,
          currency: currency,
          ...parameters,
        })
      }

      // Pinterest Tag
      if (typeof (window as any).pintrk !== "undefined") {
        ;(window as any).pintrk("track", name, {
          value: value,
          currency: currency,
          ...parameters,
        })
      }

      // Microsoft UET
      if (typeof (window as any).uetq !== "undefined") {
        ;(window as any).uetq.push("event", name, {
          revenue_value: value,
          currency: currency,
          ...parameters,
        })
      }

      // Reddit Pixel
      if (typeof (window as any).rdt !== "undefined") {
        ;(window as any).rdt("track", name, {
          value: value,
          currency: currency,
          ...parameters,
        })
      }

      // Hotjar (only if initialized)
      if (typeof (window as any).hj !== "undefined") {
        ;(window as any).hj("event", name)
      }
    } catch (error) {
      console.warn("Analytics tracking error:", error)
    }
  }

  // Predefined tracking events for common actions
  static trackPageView(page: string) {
    this.track({
      name: "page_view",
      parameters: { page_title: document.title, page_location: page },
    })
  }

  static trackApplicationStart() {
    this.track({
      name: "begin_checkout",
      parameters: { content_type: "application" },
    })
  }

  static trackApplicationSubmit(fundingAmount: number) {
    this.track({
      name: "purchase",
      parameters: { content_type: "application_submitted" },
      value: fundingAmount,
    })
  }

  static trackLeadGeneration(leadType: string) {
    this.track({
      name: "generate_lead",
      parameters: { lead_type: leadType },
    })
  }

  static trackContactForm() {
    this.track({
      name: "contact",
      parameters: { method: "form" },
    })
  }

  static trackPhoneCall() {
    this.track({
      name: "contact",
      parameters: { method: "phone" },
    })
  }

  static trackProductView(productName: string) {
    this.track({
      name: "view_item",
      parameters: { item_name: productName, content_type: "product" },
    })
  }
}
