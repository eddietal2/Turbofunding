"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  MessageCircleIcon,
  ShareIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react"

interface SocialShareProps {
  url: string
  title: string
  description: string
  hashtags?: string[]
}

export function SocialShare({ url, title, description, hashtags = [] }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const hashtagString = hashtags.map((tag) => `#${tag}`).join(" ")

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtags.join(",")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    tiktok: `https://www.tiktok.com/`, // TikTok doesn't support direct URL sharing
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const openShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400")
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-400 mr-2">Share:</span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => openShare("facebook")}
        className="text-blue-600 hover:bg-blue-600/10"
        aria-label="Share on Facebook"
      >
        <FacebookIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => openShare("twitter")}
        className="text-blue-400 hover:bg-blue-400/10"
        aria-label="Share on X (Twitter)"
      >
        <TwitterIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => openShare("linkedin")}
        className="text-blue-700 hover:bg-blue-700/10"
        aria-label="Share on LinkedIn"
      >
        <LinkedinIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => openShare("whatsapp")}
        className="text-green-500 hover:bg-green-500/10"
        aria-label="Share on WhatsApp"
      >
        <MessageCircleIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => openShare("pinterest")}
        className="text-red-600 hover:bg-red-600/10"
        aria-label="Share on Pinterest"
      >
        <ShareIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        className="text-gray-400 hover:bg-gray-400/10"
        aria-label="Copy link"
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      </Button>
    </div>
  )
}
