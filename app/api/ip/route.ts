import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Get the client IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const cfConnectingIp = request.headers.get("cf-connecting-ip")
  
  // x-forwarded-for can contain multiple IPs (client, proxy1, proxy2...)
  // The first one is the original client IP
  const ip = forwardedFor?.split(",")[0]?.trim() 
    || cfConnectingIp 
    || realIp 
    || "Unknown"

  const userAgent = request.headers.get("user-agent") || "Unknown"

  return NextResponse.json({ 
    ip, 
    userAgent,
    timestamp: new Date().toISOString() 
  })
}
