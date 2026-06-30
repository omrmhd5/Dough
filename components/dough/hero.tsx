'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WaveDivider } from './wave-divider'
import { Blob } from './blob'
import { Logo } from './logo'

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // SSR Safe Check
    if (typeof window === 'undefined') return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initial Page Load Timeline
    const tl = gsap.timeline()

    // Hide elements initially to avoid flash of unstyled content (FOUC)
    // 1. Initial State Set
    gsap.set([
      '.gsap-nav-logo',
      '.gsap-nav-link',
      '.gsap-nav-btn',
      '.gsap-subtitle',
      '.hero-logo-img'
    ], {
      opacity: 0
    })

    gsap.set(['.gsap-nav-logo', '.gsap-nav-link', '.gsap-nav-btn', '.gsap-subtitle'], {
      filter: 'blur(10px)'
    })

    gsap.set('.hero-logo-img', {
      y: 60,
      scale: 0.95
    })

    // Execute Staggered Jelly letters timeline
    tl.to('.hero-logo-img', {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'back.out(1.5)'
    })
    // Smooth blur reveal for nav components and tagline
    .to(['.gsap-nav-logo', '.gsap-nav-link', '.gsap-nav-btn', '.gsap-subtitle'], {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.05,
      ease: 'power2.out'
    }, '-=0.9')


    // Lava-Lamp background drifts
    const leftBlobAnim = gsap.to('.hero-blob-left', {
      x: '+=25',
      y: '+=20',
      rotation: 12,
      duration: 11,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    const rightBlobAnim = gsap.to('.hero-blob-right', {
      x: '-=30',
      y: '-=25',
      rotation: -15,
      duration: 13,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Interactive Mouse Move Events
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Mask Image Parallax
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const relX = (e.clientX - rect.left) / rect.width - 0.5
        const relY = (e.clientY - rect.top) / rect.height - 0.5

        gsap.to('.hero-parallax-img', {
          x: relX * -35,
          y: relY * -35,
          duration: 0.6,
          ease: 'power2.out'
        })
      }

      // 2. Magnetic Pull Event helper
      const applyMagnetic = (elementsSelector: string, strength = 0.35) => {
        const elements = document.querySelectorAll(elementsSelector)
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = e.clientX - centerX
          const deltaY = e.clientY - centerY
          const distance = Math.hypot(deltaX, deltaY)

          if (distance < 110) {
            gsap.to(el, {
              x: deltaX * strength,
              y: deltaY * strength,
              duration: 0.3,
              ease: 'power2.out'
            })
          } else {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: 'power2.out'
            })
          }
        })
      }

      applyMagnetic('.gsap-nav-btn', 0.45)
    }

    const handleMouseLeave = () => {
      // Return magnetic elements to origin elastically
      gsap.to('.gsap-nav-btn', {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1.2, 0.3)'
      })
      gsap.to('.hero-parallax-img', {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    if (heroRef.current) {
      heroRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

    // Scroll-to-Zoom Expansion transition
    const trigger = gsap.to('.hero-zoom-container', {
      scrollTrigger: {
        trigger: '#top',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      scale: 5.5,
      ease: 'none'
    })

    // Cleanups
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (heroRef.current) {
        heroRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
      leftBlobAnim.kill()
      rightBlobAnim.kill()
      trigger.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative overflow-hidden bg-navy pt-28 pb-32 text-cream sm:pb-40"
    >
      {/* faint floating background blobs in lava-lamp liquid loop */}
      <div className="absolute -left-16 top-32 size-64 pointer-events-none hero-blob-left">
        <Blob
          variant={1}
          float
          className="size-full bg-cream/5"
        />
      </div>
      
      <div className="absolute -right-10 bottom-40 size-72 pointer-events-none hero-blob-right">
        <Blob
          variant={3}
          float
          className="size-full bg-blob/10"
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <span className="mb-8 rounded-full border border-cream/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cream/70 animate-in fade-in slide-in-from-top-6 duration-1000 ease-out">
          creative agency · est. 2026
        </span>

        {/* Staggered rise invisible baseline */}
        <h1 className="leading-[0.82] tracking-tighter overflow-hidden py-2">
          <Logo className="text-[26vw] sm:text-[20vw] lg:text-[16rem]" gsapClass="hero-logo" />
        </h1>

        <p className="mt-8 text-balance font-display text-xl font-medium lowercase text-cream/80 sm:text-2xl md:text-3xl gsap-subtitle">
          where ideas take shapes
        </p>

        {/* ScrollTrigger Zoom container */}
        <div className="relative mt-12 w-full max-w-2xl hero-zoom-container will-change-transform">
          <Blob variant={2} className="overflow-hidden bg-[#122940] shadow-2xl hero-image-mask will-change-transform">
            <div className="relative aspect-[16/10] w-full bg-[#122940]">
              <img
                src="/dough-hero.png"
                alt="Hands kneading raw dough on a floured surface"
                className="absolute inset-0 w-full h-full object-cover hero-parallax-img will-change-transform bg-[#122940]"
              />
            </div>
          </Blob>
        </div>
      </div>

      {/* wave transition into the cream "who we are" section */}
      <WaveDivider
        fill="var(--cream)"
        className="absolute inset-x-0 bottom-0 z-10"
      />
    </section>
  )
}
