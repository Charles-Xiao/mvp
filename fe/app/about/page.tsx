import React from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/e1RPUtk9VWY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Head>
        <title>About Us | Dance Events</title>
        <meta name="description" content="Learn more about our dance events and what we offer." />
      </Head>
      <Navbar />
      <section className="w-full h-[60vh] relative">
        <img
          src="/banner-bg.jpg"
          width={1920}
          height={1080}
          alt="Company Banner"
          className="w-full h-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.2)] flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">About Our Company</h1>
            <p className="text-lg md:text-xl">Discover our history, team, and culture.</p>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-16 px-4 md:px-6 space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            At our company, we&apos;re driven by a passion for innovation and a commitment to excellence. Since our founding
            in 2010, we&apos;ve been on a mission to revolutionize the industry with our cutting-edge products and services.
          </p>
          <p className="text-muted-foreground text-lg md:text-xl">
            Our vision is to empower our customers with the tools they need to succeed, and our core values of
            integrity, collaboration, and continuous improvement guide us every step of the way.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-muted-foreground">CEO</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              John is the visionary behind our company, leading our team with a relentless drive for innovation and a
              deep commitment to our customers.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Jane Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Charles Xiao</h3>
                <p className="text-muted-foreground">CTO</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Jane is our technical mastermind, leading our engineering team to deliver cutting-edge solutions that push
              the boundaries of what is possible.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Michael Johnson" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Michael Johnson</h3>
                <p className="text-muted-foreground">COO</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Michael is the driving force behind our operational excellence, ensuring that our team and processes are
              always running at peak efficiency.
            </p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Our History</h2>
            <div className="mt-6 relative before:absolute before:inset-y-0 before:left-[18px] before:w-[2px] before:bg-muted">
              <div className="flex items-start space-x-4">
                <div className="shrink-0 relative">
                  <div className="h-4 w-4 rounded-full bg-blue-600" />
                  <div className="absolute -left-[9px] -top-[9px] h-8 w-8 rounded-full bg-blue-600/20" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">2010 - Founding</h3>
                  <p className="text-muted-foreground">
                    Our company was founded with a vision to revolutionize the industry.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mt-6">
                <div className="shrink-0 relative">
                  <div className="h-4 w-4 rounded-full bg-blue-600" />
                  <div className="absolute -left-[9px] -top-[9px] h-8 w-8 rounded-full bg-blue-600/20" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">2015 - Expansion</h3>
                  <p className="text-muted-foreground">
                    We expanded our operations and opened new offices in key markets.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mt-6">
                <div className="shrink-0 relative">
                  <div className="h-4 w-4 rounded-full bg-blue-600" />
                  <div className="absolute -left-[9px] -top-[9px] h-8 w-8 rounded-full bg-blue-600/20" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">2020 - Transformation</h3>
                  <p className="text-muted-foreground">
                    We underwent a major transformation to adapt to the changing market.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mt-6">
                <div className="shrink-0 relative">
                  <div className="h-4 w-4 rounded-full bg-blue-600" />
                  <div className="absolute -left-[9px] -top-[9px] h-8 w-8 rounded-full bg-blue-600/20" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">2023 - Innovation</h3>
                  <p className="text-muted-foreground">
                    We continue to innovate and push the boundaries of what is possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Our Culture</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <BuildingIcon className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-semibold">Modern Workspace</h3>
                </div>
                <p className="text-muted-foreground">
                  Our office is designed to foster collaboration and creativity, with open floor plans, ample natural
                  light, and state-of-the-art amenities.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <UsersIcon className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-semibold">Team Building</h3>
                </div>
                <p className="text-muted-foreground">
                  We believe in the power of teamwork, and we regularly organize team-building activities to strengthen
                  our bonds and foster a sense of community.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <SmileIcon className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-semibold">Work-Life Balance</h3>
                </div>
                <p className="text-muted-foreground">
                  We understand the importance of work-life balance, and we strive to create a supportive and flexible
                  work environment that allows our team to thrive both professionally and personally.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <RocketIcon className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-semibold">Continuous Learning</h3>
                </div>
                <p className="text-muted-foreground">
                  We believe in the power of continuous learning, and we encourage our team to explore new technologies,
                  attend industry events, and pursue professional development opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

function BuildingIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

function RocketIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function SmileIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}

function UsersIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
