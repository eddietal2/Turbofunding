"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { XIcon, RotateCcwIcon, CheckIcon } from "lucide-react"
import Image from "next/image"

interface SignatureModalProps {
  isOpen: boolean
  onClose: () => void
  onSign: (signatureDataUrl: string) => void
  signerName: string
  signerNumber?: number // Current signer number (1-based)
  totalSigners?: number // Total number of signers
}

export function SignatureModal({ isOpen, onClose, onSign, signerName, signerNumber = 1, totalSigners = 1 }: SignatureModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const typedCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 200 })
  const [signatureMode, setSignatureMode] = useState<"draw" | "type">("draw")
  const [typedSignature, setTypedSignature] = useState("")
  const [typedHasSignature, setTypedHasSignature] = useState(false)

  const generateTypedSignatureCanvas = useCallback((text: string): string => {
    const canvas = typedCanvasRef.current
    if (!canvas) return ""

    const width = 400
    const height = 200
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    if (!ctx) return ""

    // Clear canvas with white background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    // Draw signature baseline
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(20, height - 40)
    ctx.lineTo(width - 20, height - 40)
    ctx.stroke()

    // Draw typed signature in cursive font
    if (text.trim()) {
      // Use system cursive font - try multiple options for cross-platform compatibility
      ctx.font = "italic 48px 'Brush Script MT', 'Lucida Handwriting', cursive"
      ctx.fillStyle = "#1a365d"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      
      // Draw text centered on the baseline
      ctx.fillText(text, width / 2, height - 40)
    }

    return canvas.toDataURL("image/png")
  }, [])

  const handleTypedSignatureChange = (value: string) => {
    setTypedSignature(value)
    setTypedHasSignature(value.trim().length > 0)
  }

  const handleTypedSign = () => {
    const dataUrl = generateTypedSignatureCanvas(typedSignature)
    onSign(dataUrl)
  }

  // Resize canvas to fit container

  const updateCanvasSize = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 4 // Account for border
      const width = Math.min(containerWidth, 600)
      const height = Math.min(width * 0.4, 200) // 2.5:1 aspect ratio, max 200px height
      setCanvasSize({ width, height })
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      updateCanvasSize()
      window.addEventListener("resize", updateCanvasSize)
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
      
      return () => {
        window.removeEventListener("resize", updateCanvasSize)
        document.body.style.overflow = ""
      }
    }
  }, [isOpen, updateCanvasSize])

  // Initialize canvas when size changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isOpen) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas resolution for high DPI displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvasSize.width * dpr
    canvas.height = canvasSize.height * dpr
    ctx.scale(dpr, dpr)

    // Set up canvas styling
    ctx.strokeStyle = "#1a365d" // Dark blue ink color
    ctx.lineWidth = 2.5
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    // Clear and draw signature line
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
    
    // Draw signature baseline
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(20, canvasSize.height - 40)
    ctx.lineTo(canvasSize.width - 20, canvasSize.height - 40)
    ctx.stroke()
    
    // Reset stroke style for signature
    ctx.strokeStyle = "#1a365d"
    ctx.lineWidth = 2.5

    setHasSignature(false)
  }, [canvasSize, isOpen])

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvasSize.width / rect.width
    const scaleY = canvasSize.height / rect.height

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)
    setHasSignature(true)

    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    e.preventDefault()

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    // Redraw signature line
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(20, canvasSize.height - 40)
    ctx.lineTo(canvasSize.width - 20, canvasSize.height - 40)
    ctx.stroke()

    // Reset stroke style
    ctx.strokeStyle = "#1a365d"
    ctx.lineWidth = 2.5

    setHasSignature(false)
  }

  const handleSign = () => {
    const canvas = canvasRef.current
    if (!canvas || !hasSignature) return

    // Get signature as data URL
    const dataUrl = canvas.toDataURL("image/png")
    onSign(dataUrl)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4">
      <div className="bg-white w-full sm:rounded-xl sm:shadow-2xl sm:max-w-lg sm:w-full animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-3 flex-1">
            <Image
              src="/images/tf-logo.png"
              alt="TurboFunding"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-gray-900">Sign Your Application</h2>
                {totalSigners > 1 && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-semibold">
                    Signer {signerNumber} of {totalSigners}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {signatureMode === "draw" ? "Use your finger or mouse to sign below" : "Type your signature below"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="border-b border-gray-200 px-4 sm:px-6 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSignatureMode("draw")
                setHasSignature(false)
                clearSignature()
              }}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                signatureMode === "draw"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ✍️ Draw Signature
            </button>
            <button
              onClick={() => setSignatureMode("type")}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                signatureMode === "type"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📝 Type Signature
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-5">
          {/* Signer info */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Signing as:</span> {signerName}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              By signing, you confirm all information provided is accurate and true.
            </p>
          </div>

          {signatureMode === "draw" ? (
            <>
              {/* Draw Mode - Signature canvas */}
              <div ref={containerRef} className="w-full">
                <div className="border-2 border-gray-300 rounded-lg bg-white relative overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    style={{ 
                      width: canvasSize.width, 
                      height: canvasSize.height,
                      touchAction: "none",
                      cursor: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cline x1='12' y1='0' x2='12' y2='24' stroke='%231a365d' stroke-width='2'/%3E%3Cline x1='0' y1='12' x2='24' y2='12' stroke='%231a365d' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='3' fill='none' stroke='%231a365d' stroke-width='2'/%3E%3C/svg%3E\") 12 12, crosshair"
                    }}
                    className="w-full"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  {!hasSignature && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-gray-400 text-base sm:text-lg font-medium">
                        ✍️ Sign here
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Clear button for draw mode */}
              <div className="flex justify-end mt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSignature}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={!hasSignature}
                >
                  <RotateCcwIcon className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Type Mode - Text input and preview */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Your Signature
                  </label>
                  <input
                    type="text"
                    value={typedSignature}
                    onChange={(e) => handleTypedSignatureChange(e.target.value)}
                    placeholder="Type your name"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    maxLength={50}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {typedSignature.length}/50 characters
                  </p>
                </div>

                {/* Signature preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="border-2 border-gray-300 rounded-lg bg-white p-6 relative overflow-hidden h-40 flex items-center justify-center">
                    {typedHasSignature ? (
                      <div 
                        style={{
                          fontSize: "48px",
                          fontStyle: "italic",
                          fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                          color: "#1a365d",
                          textAlign: "center",
                          width: "100%"
                        }}
                      >
                        {typedSignature}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-lg font-medium">
                        Your signature will appear here
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Legal text */}
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            By signing this application, I certify that all information provided is true and accurate 
            to the best of my knowledge. I authorize TurboFunding.com to verify this information and 
            obtain credit reports as necessary.
          </p>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 rounded-b-xl">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={signatureMode === "draw" ? handleSign : handleTypedSign}
            disabled={signatureMode === "draw" ? !hasSignature : !typedHasSignature}
            className="w-full sm:flex-1 bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed order-1 sm:order-2"
          >
            <CheckIcon className="h-4 w-4 mr-2" />
            {totalSigners > 1 && signerNumber < totalSigners
              ? "Sign & Continue"
              : "Sign & Submit Application"}
          </Button>
        </div>

        {/* Hidden canvas for typed signature generation */}
        <canvas ref={typedCanvasRef} style={{ display: "none" }} />      </div>
    </div>
  )
}