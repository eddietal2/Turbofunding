"use client"

import { useEffect } from "react"
import Script from "next/script"

interface TrackingPixelsProps {
  facebookPixelId?: string
  linkedInPartnerId?: string
  googleAnalyticsId?: string
  googleAdsId?: string
  tiktokPixelId?: string
  twitterPixelId?: string
  snapchatPixelId?: string
  pinterestTagId?: string
  microsoftUetId?: string
  redditPixelId?: string
}

export function TrackingPixels({
  facebookPixelId = "YOUR_FACEBOOK_PIXEL_ID",
  linkedInPartnerId = "YOUR_LINKEDIN_PARTNER_ID",
  googleAnalyticsId = "G-XXXXXXXXXX",
  googleAdsId = "AW-XXXXXXXXXX",
  tiktokPixelId = "YOUR_TIKTOK_PIXEL_ID",
  twitterPixelId = "YOUR_TWITTER_PIXEL_ID",
  snapchatPixelId = "YOUR_SNAPCHAT_PIXEL_ID",
  pinterestTagId = "YOUR_PINTEREST_TAG_ID",
  microsoftUetId = "YOUR_MICROSOFT_UET_ID",
  redditPixelId = "YOUR_REDDIT_PIXEL_ID",
}: TrackingPixelsProps) {
  useEffect(() => {
    // Initialize tracking pixels after component mounts
    if (typeof window !== "undefined") {
      // Facebook Pixel initialization
      if (facebookPixelId && facebookPixelId !== "YOUR_FACEBOOK_PIXEL_ID") {
        ;(window as any).fbq("init", facebookPixelId)
        ;(window as any).fbq("track", "PageView")
      }

      // LinkedIn Insight Tag initialization
      if (linkedInPartnerId && linkedInPartnerId !== "YOUR_LINKEDIN_PARTNER_ID") {
        ;(window as any)._linkedin_partner_id = linkedInPartnerId
        ;(window as any)._linkedin_data_partner_ids = [linkedInPartnerId]
      }

      // TikTok Pixel initialization
      if (tiktokPixelId && tiktokPixelId !== "YOUR_TIKTOK_PIXEL_ID") {
        ;(window as any).ttq.load(tiktokPixelId)
        ;(window as any).ttq.page()
      }

      // Twitter Pixel initialization
      if (twitterPixelId && twitterPixelId !== "YOUR_TWITTER_PIXEL_ID") {
        ;(window as any).twq("init", twitterPixelId)
        ;(window as any).twq("track", "PageView")
      }

      // Snapchat Pixel initialization
      if (snapchatPixelId && snapchatPixelId !== "YOUR_SNAPCHAT_PIXEL_ID") {
        ;(window as any).snaptr("init", snapchatPixelId, {
          user_email: "__INSERT_USER_EMAIL__",
        })
        ;(window as any).snaptr("track", "PAGE_VIEW")
      }

      // Pinterest Tag initialization
      if (pinterestTagId && pinterestTagId !== "YOUR_PINTEREST_TAG_ID") {
        ;(window as any).pintrk("load", pinterestTagId)
        ;(window as any).pintrk("page")
      }

      // Microsoft UET initialization
      if (microsoftUetId && microsoftUetId !== "YOUR_MICROSOFT_UET_ID") {
        ;(window as any).uetq = (window as any).uetq || []
        ;(window as any).uetq.push("event", "page_view", {})
      }

      // Reddit Pixel initialization
      if (redditPixelId && redditPixelId !== "YOUR_REDDIT_PIXEL_ID") {
        ;(window as any).rdt("init", redditPixelId, {
          optOut: false,
          useDecimalCurrencyValues: true,
        })
        ;(window as any).rdt("track", "PageVisit")
      }

      // Hotjar initialization (only if environment variable is set)
      if (process.env.NEXT_PUBLIC_HOTJAR_ID) {
        // Hotjar will be initialized by the script tag
        console.log("Hotjar initialized with ID:", process.env.NEXT_PUBLIC_HOTJAR_ID)
      }
    }
  }, [
    facebookPixelId,
    linkedInPartnerId,
    tiktokPixelId,
    twitterPixelId,
    snapchatPixelId,
    pinterestTagId,
    microsoftUetId,
    redditPixelId,
  ])

  return (
    <>
      {/* Google Analytics 4 */}
      {googleAnalyticsId && googleAnalyticsId !== "G-XXXXXXXXXX" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
              });
            `}
          </Script>
        </>
      )}

      {/* Google Ads Conversion Tracking */}
      {googleAdsId && googleAdsId !== "AW-XXXXXXXXXX" && (
        <Script id="google-ads" strategy="afterInteractive">
          {`
            gtag('config', '${googleAdsId}');
          `}
        </Script>
      )}

      {/* Facebook Pixel */}
      {facebookPixelId && facebookPixelId !== "YOUR_FACEBOOK_PIXEL_ID" && (
        <>
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* LinkedIn Insight Tag */}
      {linkedInPartnerId && linkedInPartnerId !== "YOUR_LINKEDIN_PARTNER_ID" && (
        <>
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${linkedInPartnerId}&fmt=gif`}
            />
          </noscript>
        </>
      )}

      {/* TikTok Pixel */}
      {tiktokPixelId && tiktokPixelId !== "YOUR_TIKTOK_PIXEL_ID" && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {/* Twitter Pixel */}
      {twitterPixelId && twitterPixelId !== "YOUR_TWITTER_PIXEL_ID" && (
        <Script id="twitter-pixel" strategy="afterInteractive">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          `}
        </Script>
      )}

      {/* Snapchat Pixel */}
      {snapchatPixelId && snapchatPixelId !== "YOUR_SNAPCHAT_PIXEL_ID" && (
        <Script id="snapchat-pixel" strategy="afterInteractive">
          {`
            (function(e,t,n){if(e.snaptr)return;var p=e.snaptr=function()
            {p.handleRequest?p.handleRequest.apply(p,arguments):p.queue.push(arguments)};
            p.queue=[];var s='script';r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');
          `}
        </Script>
      )}

      {/* Pinterest Tag */}
      {pinterestTagId && pinterestTagId !== "YOUR_PINTEREST_TAG_ID" && (
        <Script id="pinterest-tag" strategy="afterInteractive">
          {`
            !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          `}
        </Script>
      )}

      {/* Microsoft UET (Bing Ads) */}
      {microsoftUetId && microsoftUetId !== "YOUR_MICROSOFT_UET_ID" && (
        <Script id="microsoft-uet" strategy="afterInteractive">
          {`
            (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"${microsoftUetId}"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
          `}
        </Script>
      )}

      {/* Reddit Pixel */}
      {redditPixelId && redditPixelId !== "YOUR_REDDIT_PIXEL_ID" && (
        <Script id="reddit-pixel" strategy="afterInteractive">
          {`
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
          `}
        </Script>
      )}

      {/* Hotjar Tracking */}
      {process.env.NEXT_PUBLIC_HOTJAR_ID && (
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}
    </>
  )
}
