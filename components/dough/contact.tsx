'use client'

import { useState } from 'react'
import { AtSign, Mail, MapPin, Send, Check, Loader2 } from 'lucide-react'
import { Reveal } from './reveal'

const DETAILS = [
  { icon: AtSign, label: 'socials', value: '@dough.eg', href: 'https://instagram.com/dough.eg' },
  { icon: Mail, label: 'mail', value: 'hello@dough.com', href: 'mailto:hello@dough.com' },
  {
    icon: MapPin,
    label: 'address',
    value: '65 St. Abdelaziz Fahmy, Saint Fatima, Cairo, Egypt',
    href: 'https://maps.google.com',
  },
]

const SERVICES = [
  'Branding',
  'Content Creation',
  'CGI & Visuals',
  'Events & Activations',
  'F&B Consulting',
  'Media Strategy'
]

const BUDGET_RANGES = [
  'Under $10k',
  '$10k - $25k',
  '$25k - $50k',
  '$50k+'
]

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState('')
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      return
    }

    setFormStatus('submitting')
    setStatusMessage('Kneading the data...')

    // Simulate baking stages
    setTimeout(() => {
      setStatusMessage('Baking your message...')
      setTimeout(() => {
        setStatusMessage('Rising...')
        setTimeout(() => {
          setFormStatus('success')
        }, 800)
      }, 800)
    }, 800)
  }

  return (
    <section id="contact" className="relative bg-navy pt-24 pb-20 text-cream md:pt-32 min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Decorative Blob Glows */}
      <div className="absolute top-[-10%] right-[-10%] size-96 rounded-full bg-blob/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] size-[500px] rounded-full bg-water/20 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal duration={800}>
              <span className="text-xs uppercase font-extrabold tracking-widest text-blob/90">
                Get in Touch
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-cream mt-2 leading-[1.1]">
                Let's bake your <br />
                <span className="text-blob">next big idea.</span>
              </h2>
              <p className="mt-6 text-lg text-cream/70 leading-relaxed max-w-md">
                Every great brand starts raw, soft, and full of promise. Let's knead strategy with art and watch it rise.
              </p>
            </Reveal>

            {/* Contact Information */}
            <div className="flex flex-col gap-4 mt-4">
              {DETAILS.map(({ icon: Icon, label, value, href }, i) => (
                <Reveal key={label} delay={i * 100} duration={750}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-5 group rounded-2xl border border-cream/5 bg-cream/[0.03] p-5 hover:bg-cream/[0.08] hover:border-cream/10 transition-all duration-300"
                  >
                    <div className="size-11 rounded-xl bg-blob/10 flex items-center justify-center text-blob group-hover:bg-blob group-hover:text-navy transition-all duration-300">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cream/40 block">
                        {label}
                      </span>
                      <span className="text-sm font-medium text-cream group-hover:text-blob transition-colors duration-300">
                        {value}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <Reveal duration={900} delay={150}>
              <div className="bg-cream/[0.03] border border-cream/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-xl">
                
                {formStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in duration-500">
                    <div className="size-20 rounded-full bg-blob/20 border border-blob/30 flex items-center justify-center text-blob mb-6 animate-bounce">
                      <Check className="size-10" />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-cream leading-tight">
                      Freshly Baked! 🍞
                    </h3>
                    <p className="text-cream/70 mt-4 max-w-md leading-relaxed text-sm sm:text-base">
                      Your message is officially in our creative oven. We will review your ingredients and get back to you hot and fresh!
                    </p>
                    <button
                      onClick={() => {
                        setFormStatus('idle')
                        setName('')
                        setEmail('')
                        setCompany('')
                        setMessage('')
                        setSelectedServices([])
                        setBudget('')
                      }}
                      className="mt-8 text-xs uppercase font-extrabold tracking-widest bg-blob hover:bg-blob/85 text-navy px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
                    
                    {formStatus === 'submitting' ? (
                      <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-300">
                        <Loader2 className="size-12 text-blob animate-spin mb-4" />
                        <p className="text-blob font-mono text-sm tracking-widest uppercase animate-pulse">
                          {statusMessage}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2">
                          <h3 className="font-display text-xl font-bold text-cream">
                            Tell us about your project
                          </h3>
                          <p className="text-xs text-cream/55">
                            Fill out the recipe below and we'll start prep.
                          </p>
                        </div>

                        {/* Name & Email Group */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Amr Sabry"
                              className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                            />
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="hello@dough.com"
                              className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                            />
                          </div>
                        </div>

                        {/* Company Group */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                            Company or Brand Name
                          </label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Barn's Coffee"
                            className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                          />
                        </div>

                        {/* Services Toggles */}
                        <div className="flex flex-col gap-3">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                            What services do you need?
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {SERVICES.map((service) => {
                              const isSelected = selectedServices.includes(service)
                              return (
                                <button
                                  type="button"
                                  key={service}
                                  onClick={() => handleServiceToggle(service)}
                                  className={`text-xs px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer font-sans ${
                                    isSelected
                                      ? 'bg-blob border-blob text-navy font-bold shadow-md'
                                      : 'bg-cream/[0.02] border-cream/10 text-cream/70 hover:border-cream/30 hover:text-cream'
                                  }`}
                                >
                                  {service}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Budget Ranges */}
                        <div className="flex flex-col gap-3">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                            Estimated Project Budget
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {BUDGET_RANGES.map((range) => {
                              const isSelected = budget === range
                              return (
                                <button
                                  type="button"
                                  key={range}
                                  onClick={() => setBudget(range)}
                                  className={`text-xs py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer font-sans ${
                                    isSelected
                                      ? 'bg-blob border-blob text-navy font-bold shadow-md'
                                      : 'bg-cream/[0.02] border-cream/10 text-cream/70 hover:border-cream/30 hover:text-cream'
                                  }`}
                                >
                                  {range}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                            Tell us about your raw dough... *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Share your goals, timeline, or any creative ideas you want to mold..."
                            className="w-full bg-cream/[0.04] border border-cream/15 rounded-2xl px-4 py-3.5 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm resize-none font-sans"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-3 bg-blob hover:bg-blob/85 text-navy font-extrabold uppercase text-xs tracking-widest py-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-[1px]"
                        >
                          <Send className="size-4" />
                          Bake & Send Message
                        </button>
                      </>
                    )}
                  </form>
                )}

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}
