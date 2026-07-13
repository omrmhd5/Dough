'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react'
import { Reveal } from './reveal'

const ROLES = [
  'Designer',
  'Developer',
  'Marketer',
  'Copywriter',
  'Other'
]

export function JoinTeam() {
  // Form Field States
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cityCountry, setCityCountry] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [applyingFor, setApplyingFor] = useState('')
  const [showWork, setShowWork] = useState('')
  const [anythingElse, setAnythingElse] = useState('')
  
  // File Attachment States
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form Submission States
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (selectedFile: File): boolean => {
    setFileError('')
    const allowedExtensions = ['pdf', 'doc', 'docx']
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || ''
    
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError('Invalid file format. Only PDF, DOC, and DOCX are accepted.')
      return false
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setFileError('File size exceeds the 20 MB limit.')
      return false
    }

    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
      }
    }
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault()
    setFile(null)
    setFileError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Submission Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!email.trim()) {
      newErrors.email = 'Email Address is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!phone.trim()) newErrors.phone = 'Phone Number is required'
    if (!cityCountry.trim()) newErrors.cityCountry = 'City / Country is required'
    if (!applyingFor) newErrors.applyingFor = 'Please select a role'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setFormStatus('submitting')
    setStatusMessage('Reviewing your raw talent...')

    setTimeout(() => {
      setStatusMessage('Kneading your portfolio...')
      setTimeout(() => {
        setStatusMessage('Rising...')
        setTimeout(() => {
          setFormStatus('success')
        }, 800)
      }, 800)
    }, 800)
  }

  return (
    <div className="border-t border-cream/10 pt-16 pb-12 text-cream">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Title and CTA Link */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-between lg:py-6">
          <Reveal duration={850}>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-blob/90 font-display">
                We&apos;re always looking for bright new talents
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-cream mt-2">
                Join the team!
              </h2>
            </div>

            {/* Desktop only line visual to point to the form */}
            <div className="hidden lg:flex items-center gap-6 mt-16 group select-none">
              <span className="font-display text-xl font-bold uppercase tracking-widest text-blob transition-colors duration-300 group-hover:text-cream">
                Apply now
              </span>
              <div className="h-[2px] bg-blob/40 flex-1 relative min-w-[120px] overflow-hidden group-hover:bg-cream/60 transition-colors duration-300">
                <span className="absolute inset-0 bg-blob -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                <span className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[2px] border-r-[2px] border-blob size-2.5 rotate-45 group-hover:border-cream transition-colors duration-300" />
              </div>
            </div>

            {/* Get in Touch Alternate Link */}
            <p className="text-sm text-cream/50 mt-6 lg:mt-8 font-display">
              Looking to bake an idea instead?{' '}
              <Link href="/contact" className="text-blob hover:underline font-bold transition-all duration-300">
                Contact us
              </Link>
            </p>
          </Reveal>
        </div>

        {/* Right Column: Form Container */}
        <div className="lg:col-span-7 bg-cream/[0.02] border border-cream/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          {formStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center py-16 animate-in fade-in duration-500">
              <div className="size-16 rounded-full bg-blob/10 flex items-center justify-center text-blob mb-6">
                <CheckCircle2 className="size-10" />
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">
                Application Received!
              </h3>
              <p className="mt-4 text-sm text-cream/70 max-w-md leading-relaxed">
                Thank you for applying. We are reviewing your profile and will get back to you shortly if your credentials match our current needs.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormStatus('idle')
                  setFullName('')
                  setEmail('')
                  setPhone('')
                  setCityCountry('')
                  setLinkedin('')
                  setApplyingFor('')
                  setShowWork('')
                  setAnythingElse('')
                  setFile(null)
                }}
                className="mt-8 px-6 py-2.5 rounded-full border border-cream/20 text-xs font-semibold text-cream hover:bg-cream/10 cursor-pointer transition-colors duration-300"
              >
                Apply for another role
              </button>
            </div>
          ) : formStatus === 'submitting' ? (
            <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-300">
              <Loader2 className="size-12 text-blob animate-spin mb-4" />
              <p className="text-blob font-display text-sm tracking-widest uppercase animate-pulse">
                {statusMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Grid 1: Basic Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-cream/[0.03] border border-cream/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-blob focus:outline-none transition-all duration-300 text-sm font-display"
                  />
                  {errors.fullName && (
                    <span className="text-[10px] text-red-400 font-display px-1">{errors.fullName}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-cream/[0.03] border border-cream/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-blob focus:outline-none transition-all duration-300 text-sm font-display"
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-400 font-display px-1">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Grid 2: Location and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-cream/[0.03] border border-cream/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-blob focus:outline-none transition-all duration-300 text-sm font-display"
                  />
                  {errors.phone && (
                    <span className="text-[10px] text-red-400 font-display px-1">{errors.phone}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    required
                    value={cityCountry}
                    onChange={(e) => setCityCountry(e.target.value)}
                    placeholder="City / Country"
                    className="w-full bg-cream/[0.03] border border-cream/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-blob focus:outline-none transition-all duration-300 text-sm font-display"
                  />
                  {errors.cityCountry && (
                    <span className="text-[10px] text-red-400 font-display px-1">{errors.cityCountry}</span>
                  )}
                </div>
              </div>

              {/* Grid 3: Portfolio Link and Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="LinkedIn or Portfolio (Optional)"
                    className="w-full bg-cream/[0.03] border border-cream/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-blob focus:outline-none transition-all duration-300 text-sm font-display"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <select
                    required
                    value={applyingFor}
                    onChange={(e) => setApplyingFor(e.target.value)}
                    className="w-full bg-cream/[0.03] border border-cream/10 rounded-xl px-4 py-3 text-cream/70 placeholder-cream/30 focus:border-blob focus:outline-none transition-all duration-300 text-sm font-display appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-navy text-cream/30">What are you applying for?</option>
                    {ROLES.map((role) => (
                      <option key={role} value={role} className="bg-navy text-cream">
                        {role}
                      </option>
                    ))}
                  </select>
                  {errors.applyingFor && (
                    <span className="text-[10px] text-red-400 font-display px-1">{errors.applyingFor}</span>
                  )}
                </div>
              </div>

              {/* Textareas */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-cream/60 font-display px-1">Show us your work</label>
                <textarea
                  rows={2}
                  value={showWork}
                  onChange={(e) => setShowWork(e.target.value)}
                  placeholder="Share links to your portfolio, Behance, Dribbble, Instagram, website, or any work you're proud of."
                  className="w-full bg-cream/[0.03] border border-cream/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-blob focus:outline-none transition-all duration-300 text-sm font-display resize-none leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-cream/60 font-display px-1">Anything else you&apos;d like us to know?</label>
                <textarea
                  rows={2}
                  value={anythingElse}
                  onChange={(e) => setAnythingElse(e.target.value)}
                  placeholder="This is your chance to stand out."
                  className="w-full bg-cream/[0.03] border border-cream/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-blob focus:outline-none transition-all duration-300 text-sm font-display resize-none leading-relaxed"
                />
              </div>

              {/* File Attachment Dropzone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-cream/60 font-display px-1">Attachments</label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border border-dashed rounded-2xl p-6 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 select-none ${
                    dragActive 
                      ? 'border-blob bg-blob/5' 
                      : file 
                        ? 'border-blob/40 bg-cream/[0.01]' 
                        : 'border-cream/20 bg-cream/[0.01] hover:border-cream/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-file"
                  />
                  
                  {file ? (
                    <div className="flex items-center gap-3 w-full max-w-md bg-cream/[0.03] border border-cream/10 px-4 py-2.5 rounded-xl justify-between animate-in zoom-in-95 duration-200">
                      <div className="flex items-center gap-3 overflow-hidden text-left">
                        <Upload className="size-4 shrink-0 text-blob" />
                        <div className="truncate flex flex-col">
                          <span className="text-xs font-medium text-cream truncate">{file.name}</span>
                          <span className="text-[10px] text-cream/40">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1 rounded-full hover:bg-cream/10 text-cream/55 hover:text-cream cursor-pointer transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="resume-file"
                      className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-2"
                    >
                      <Upload className="size-6 text-cream/40 mb-2 group-hover:text-blob" />
                      <span className="text-xs font-medium text-cream/80 block">
                        Upload your CV, portfolio, or any supporting documents
                      </span>
                      <span className="text-[10px] text-cream/45 block mt-1">
                        Accepted formats: PDF, DOC, DOCX (Max. 20 MB)
                      </span>
                    </label>
                  )}
                </div>
                {fileError && (
                  <span className="text-[10px] text-red-400 font-display px-1 mt-0.5">{fileError}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blob hover:bg-blob/90 text-navy font-bold text-sm tracking-widest uppercase py-3.5 px-6 rounded-xl cursor-pointer transition-all duration-300 mt-2 shadow-lg active:scale-[0.99]"
              >
                Submit Application
              </button>
              
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
