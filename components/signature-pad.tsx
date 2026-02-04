"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SignaturePadProps {
  value: string
  onChange: (signature: string) => void
}

export function SignaturePad({ value, onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [mode, setMode] = useState<"draw" | "type">("draw")
  const [typedSignature, setTypedSignature] = useState("")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = 200

    // Set drawing styles
    ctx.strokeStyle = "#2563eb" // blue-600
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)

    const canvas = canvasRef.current
    if (!canvas) return

    // Save signature as data URL
    const dataUrl = canvas.toDataURL("image/png")
    onChange(dataUrl)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    onChange("")
  }

  const handleTypedSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTypedSignature(value)
    onChange(value)
  }

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={(v) => setMode(v as "draw" | "type")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-700">
          <TabsTrigger value="draw" className="data-[state=active]:bg-blue-600">
            Draw Signature
          </TabsTrigger>
          <TabsTrigger value="type" className="data-[state=active]:bg-blue-600">
            Type Signature
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="space-y-3">
          <Label>Draw your signature below</Label>
          <div className="border-2 border-gray-600 rounded-lg bg-white overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full cursor-crosshair touch-none"
              style={{ height: "200px" }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={clearSignature}
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            Clear Signature
          </Button>
          <p className="text-xs text-gray-400">Draw your signature using your mouse or touch screen</p>
        </TabsContent>

        <TabsContent value="type" className="space-y-3">
          <Label htmlFor="typedSignature">Type your full legal name</Label>
          <Input
            id="typedSignature"
            value={typedSignature}
            onChange={handleTypedSignatureChange}
            placeholder="Type your full legal name"
            className="bg-gray-700 border-gray-600 text-white font-serif text-lg"
          />
          <p className="text-xs text-gray-400">By typing your name, you are providing a legal electronic signature</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
