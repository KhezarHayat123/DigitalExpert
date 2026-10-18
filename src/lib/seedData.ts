import { DatabaseSchema } from "./types";

export const initialSeedData: DatabaseSchema = {
  courses: [
    {
      id: "course-wordpress",
      slug: "wordpress",
      title: "WordPress Web Development Mastery",
      shortDescription: "Learn to build professional, high-converting business websites, eCommerce stores, and custom client portals with WordPress and Elementor.",
      description: "A complete hands-on practical masterclass designed to take you from absolute zero to building high-end, responsive WordPress websites for international clients. You will learn domain & hosting setup, theme customization, Elementor Pro workflows, WooCommerce shop design, speed optimization, and freelance client acquisition strategies.",
      level: "All Levels",
      duration: "2 Months (24 Live Lectures)",
      scheduleText: "3 Days a Week (Mon, Wed, Fri) - 6:00 PM to 8:00 PM PKT",
      fee: 20000,
      oldFee: 25000,
      image: "/images/courses/wordpress.jpg",
      instructor: "Khezar Hayat",
      tools: ["WordPress", "Elementor Pro", "WooCommerce", "cPanel", "RankMath", "WP Rocket"],
      whatYouWillLearn: [
        "Complete WordPress Architecture, cPanel & Server Configuration",
        "Building High-Converting Landing Pages with Elementor Pro",
        "eCommerce Store Setup with Payment Gateways & Inventory",
        "Website Speed Optimization & 90+ Mobile Lighthouse Scores",
        "On-Page SEO Best Practices and Schema Markup",
        "Freelancing on Upwork & Fiverr: How to win \$500+ Website Projects"
      ],
      modules: [
        {
          id: "m1",
          title: "Module 1: Foundations & Local Development",
          duration: "2 Weeks",
          lectures: [
            { title: "Introduction to CMS & WordPress Ecosystem", duration: "1.5 hrs" },
            { title: "Localhost Setup with LocalWP and Server Architecture", duration: "2 hrs" },
            { title: "cPanel, DNS Records, SSL, and Production Deployment", duration: "2 hrs" },
            { title: "WordPress Dashboard Mastery, Settings & Database Basics", duration: "1.5 hrs" }
          ]
        },
        {
          id: "m2",
          title: "Module 2: Advanced Design with Elementor Pro",
          duration: "3 Weeks",
          lectures: [
            { title: "Visual Hierarchy, Typography, and Responsive Breakpoints", duration: "2 hrs" },
            { title: "Theme Builder: Custom Headers, Footers, and Single Templates", duration: "2 hrs" },
            { title: "Dynamic Content, Custom Post Types & Custom Fields", duration: "2.5 hrs" },
            { title: "Motion Effects, Popups, and Interactive Micro-animations", duration: "2 hrs" }
          ]
        },
        {
          id: "m3",
          title: "Module 3: WooCommerce eCommerce Mastery",
          duration: "2 Weeks",
          lectures: [
            { title: "Store Setup, Shipping Zones, Tax, and Currency Switcher", duration: "2 hrs" },
            { title: "Custom Single Product and Cart/Checkout Page Design", duration: "2 hrs" },
            { title: "Payment Gateways (JazzCash, EasyPaisa, Stripe, PayPal)", duration: "2 hrs" }
          ]
        },
        {
          id: "m4",
          title: "Module 4: Speed, Security & Client Acquisition",
          duration: "1 Week",
          lectures: [
            { title: "Speed Optimization: Caching, Asset Minification & CDN Setup", duration: "2 hrs" },
            { title: "Hardening WordPress Security & Preventing Malware Attacks", duration: "1.5 hrs" },
            { title: "Client Proposals, Pricing Packages & Project Delivery Guide", duration: "2.5 hrs" }
          ]
        }
      ],
      published: true,
      order: 1,
      seoTitle: "WordPress Course in Bahawalpur | DigitalExpert",
      seoDescription: "Master WordPress and Elementor Pro website design with live practical training in Bahawalpur. Fee: 20,000 PKR. Enroll today!"
    },
    {
      id: "course-social-media",
      slug: "social-media",
      title: "Social Media Marketing & Brand Growth",
      shortDescription: "Master organic growth, content strategy, viral Reels creation, and community building across Facebook, Instagram, and LinkedIn.",
      description: "Learn how to build brands from scratch and execute multi-channel organic social media campaigns. From content calendar planning and copywriting to Canva design workflows and algorithm-driven short-form video strategies, this course gives you the exact blueprint used for 300+ international clients.",
      level: "Beginner",
      duration: "1.5 Months (18 Live Lectures)",
      scheduleText: "3 Days a Week (Tue, Thu, Sat) - 5:00 PM to 7:00 PM PKT",
      fee: 10000,
      oldFee: 14000,
      image: "/images/courses/social-media.jpg",
      instructor: "Khezar Hayat",
      tools: ["Meta Business Suite", "Canva Pro", "CapCut", "Notion", "Metricool"],
      whatYouWillLearn: [
        "Brand Identity, Audience Persona & Competitor Research",
        "High-Converting Copywriting & Hook Writing for Social Media",
        "Content Calendar Execution & Batch Content Production",
        "Instagram Algorithm Secrets: Reels, Carousels & Stories",
        "Facebook Group Growth & Community Management",
        "Pitching Social Media Retainers to Business Owners"
      ],
      modules: [
        {
          id: "smm-m1",
          title: "Module 1: Strategy & Content Planning",
          duration: "2 Weeks",
          lectures: [
            { title: "Understanding Platform Demographics & Algorithms", duration: "2 hrs" },
            { title: "Developing Brand Voice, Visual Pillars & Content Themes", duration: "2 hrs" },
            { title: "Creating 30-Day Content Calendars with Notion", duration: "1.5 hrs" }
          ]
        },
        {
          id: "smm-m2",
          title: "Module 2: Creative Design & Copywriting",
          duration: "2 Weeks",
          lectures: [
            { title: "Canva Pro Masterclass: Carousels, Banners & Brand Kits", duration: "2 hrs" },
            { title: "Direct-Response Copywriting & High-Retention Hooks", duration: "2 hrs" },
            { title: "CapCut Video Editing for Viral Instagram Reels", duration: "2 hrs" }
          ]
        },
        {
          id: "smm-m3",
          title: "Module 3: Analytics, Engagement & Monetization",
          duration: "2 Weeks",
          lectures: [
            { title: "Meta Business Suite & Creator Studio Mastery", duration: "2 hrs" },
            { title: "Measuring ROI, Engagement Rate & Key Metrics", duration: "1.5 hrs" },
            { title: "Monthly Retainer Proposals & Client Reporting", duration: "2 hrs" }
          ]
        }
      ],
      published: true,
      order: 2,
      seoTitle: "Social Media Marketing Course in Bahawalpur | DigitalExpert",
      seoDescription: "Learn organic social media marketing, content creation, and brand scaling. Fee: 10,000 PKR. Practical classes in University Chowk, Bahawalpur."
    },
    {
      id: "course-google-tiktok-ads",
      slug: "google-tiktok-ads",
      title: "Google & TikTok Ads Performance Marketing",
      shortDescription: "Run high-ROI paid ad campaigns, master conversion tracking, Google Search & Display, TikTok Pixel, and media buying at scale.",
      description: "Dive deep into paid media acquisition. Master Google Ads (Search, Performance Max, YouTube Ads) and TikTok Ads Manager. Learn pixel installation, conversion API (CAPI), audience targeting, bidding strategies, and A/B split testing to generate qualified leads and e-commerce sales.",
      level: "Intermediate",
      duration: "2 Months (20 Live Lectures)",
      scheduleText: "3 Days a Week (Mon, Wed, Fri) - 4:00 PM to 6:00 PM PKT",
      fee: 15000,
      oldFee: 20000,
      image: "/images/courses/google-tiktok-ads.jpg",
      instructor: "Khezar Hayat",
      tools: ["Google Ads", "TikTok Ads Manager", "Google Tag Manager", "GA4", "Looker Studio"],
      whatYouWillLearn: [
        "Google Search, Shopping & Performance Max Campaigns",
        "TikTok Ads Setup, Spark Ads & Native UGC Video Creatives",
        "Google Tag Manager (GTM) Setup & GA4 Event Tracking",
        "Conversion Rate Optimization (CRO) for Ad Landing Pages",
        "Budget Scaling, Bid Strategies (tCPA, tROAS) & Retargeting",
        "Managing Client Ad Accounts & Generating Weekly Reports"
      ],
      modules: [
        {
          id: "ads-m1",
          title: "Module 1: Google Ads Architecture",
          duration: "3 Weeks",
          lectures: [
            { title: "Google Ads Account Structure & Keyword Match Types", duration: "2 hrs" },
            { title: "High-Intent Search Campaigns & Negative Keywords", duration: "2 hrs" },
            { title: "Responsive Search Ads & Quality Score Optimization", duration: "2 hrs" },
            { title: "Performance Max & Display Retargeting Campaigns", duration: "2.5 hrs" }
          ]
        },
        {
          id: "ads-m2",
          title: "Module 2: TikTok Ads & Creative Strategy",
          duration: "3 Weeks",
          lectures: [
            { title: "TikTok Ads Manager Setup & Business Center", duration: "2 hrs" },
            { title: "TikTok Pixel Installation & Custom Event Tracking", duration: "2 hrs" },
            { title: "Designing Viral UGC Creatives that Sell", duration: "2 hrs" },
            { title: "Bidding Strategies, Scaling Campaigns & Combating Ad Fatigue", duration: "2 hrs" }
          ]
        },
        {
          id: "ads-m3",
          title: "Module 3: Advanced Analytics & Conversion Tracking",
          duration: "2 Weeks",
          lectures: [
            { title: "Google Tag Manager and Server-Side Tracking", duration: "2 hrs" },
            { title: "Google Analytics 4 (GA4) Funnels & Attribution Models", duration: "2 hrs" },
            { title: "Live Campaign Audits & Client Reporting Dashboards", duration: "2 hrs" }
          ]
        }
      ],
      published: true,
      order: 3,
      seoTitle: "Google & TikTok Ads Course in Bahawalpur | DigitalExpert",
      seoDescription: "Master paid advertising on Google and TikTok. Learn conversion tracking, media buying, and scaling. Fee: 15,000 PKR."
    },
    {
      id: "course-video-ads",
      slug: "video-ads",
      title: "Video Ads Creation & Motion Editing",
      shortDescription: "Produce commercial video ads (30-40 sec) that convert. Master scripting, dynamic editing, voiceover sync, and visual effects.",
      description: "Video ads are the #1 driver of paid conversions on Facebook, TikTok, and Instagram. This course teaches you how to script, edit, and export commercial 30-to-40 second video ads using industry-standard tools. Learn hook psychology, pacing, sound design, animated subtitles, and 3D mockups.",
      level: "Beginner",
      duration: "1 Month (12 Live Lectures)",
      scheduleText: "3 Days a Week (Tue, Thu, Sat) - 7:00 PM to 9:00 PM PKT",
      fee: 7000,
      oldFee: 10000,
      image: "/images/courses/video-ads.jpg",
      instructor: "Khezar Hayat",
      tools: ["Premiere Pro", "CapCut Desktop", "After Effects", "Photoshop", "ElevenLabs"],
      whatYouWillLearn: [
        "The Anatomy of a 30-Second High-Converting Video Ad",
        "Writing 3-Second Visual & Audio Hooks that Stop the Scroll",
        "Dynamic Video Editing, Fast Cuts, B-Roll & Transitions",
        "Captivating Animated Subtitles & Dynamic Kinetic Typography",
        "Audio Mastering, Sound Effects (SFX) & Voiceover Sync",
        "Exporting Crisp 1080x1920 (9:16) and 1:1 Formats for Ads"
      ],
      modules: [
        {
          id: "va-m1",
          title: "Module 1: Scripting & Visual Storyboarding",
          duration: "1.5 Weeks",
          lectures: [
            { title: "Hook-Problem-Solution Framework for Video Ads", duration: "2 hrs" },
            { title: "Sourcing High-Quality Stock Footage & Sourcing UGC", duration: "1.5 hrs" },
            { title: "AI Voiceovers, Audio Pacing & Script Timing (30-40s)", duration: "2 hrs" }
          ]
        },
        {
          id: "va-m2",
          title: "Module 2: Practical Editing Masterclass",
          duration: "2.5 Weeks",
          lectures: [
            { title: "Timeline Workflow, Cuts, Overlays & Speed Ramping", duration: "2 hrs" },
            { title: "Kinetic Captions, Highlights & Graphic Overlays", duration: "2 hrs" },
            { title: "Sound Design: Swooshes, Risers, Pop-ups & Background Music", duration: "2 hrs" },
            { title: "Final Color Correction, Export Settings & Platform Delivery", duration: "2 hrs" }
          ]
        }
      ],
      published: true,
      order: 4,
      seoTitle: "Video Ads Creation Course in Bahawalpur | DigitalExpert",
      seoDescription: "Learn to produce high-converting 30-40 second video ads. Fee: 7,000 PKR. Practical training at DigitalExpert Bahawalpur."
    },
    {
      id: "course-seo",
      slug: "seo",
      title: "Search Engine Optimization (SEO) Specialist",
      shortDescription: "Rank websites on Google Page 1. Master keyword research, technical SEO, on-page optimization, content clusters, and high-authority link building.",
      description: "Learn how search engines work from top to bottom. This course covers deep technical audits, keyword intent research, competitor content gap analysis, internal linking architectures, Core Web Vitals, Google Search Console, and ethical backlink outreach strategies that drive long-term organic traffic.",
      level: "Intermediate",
      duration: "2 Months (22 Live Lectures)",
      scheduleText: "3 Days a Week (Mon, Wed, Fri) - 2:00 PM to 4:00 PM PKT",
      fee: 15000,
      oldFee: 20000,
      image: "/images/courses/seo.jpg",
      instructor: "Khezar Hayat",
      tools: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog", "SurferSEO"],
      whatYouWillLearn: [
        "In-depth Keyword Research & Search Intent Mapping",
        "Technical SEO Auditing: Crawl Errors, Robots.txt & XML Sitemaps",
        "On-Page SEO Optimization, Schema Markup & Meta Tags",
        "Core Web Vitals & Page Experience Optimization",
        "Semantic SEO, Topic Clusters & Content Siloing",
        "White-Hat Backlink Outreach & Link Building Campaigns"
      ],
      modules: [
        {
          id: "seo-m1",
          title: "Module 1: Search Fundamentals & Keyword Research",
          duration: "2 Weeks",
          lectures: [
            { title: "How Search Engines Crawl, Index, and Rank Web Pages", duration: "2 hrs" },
            { title: "Keyword Research using SEMrush, Ahrefs & Google Keyword Planner", duration: "2 hrs" },
            { title: "Competitor Analysis & Keyword Difficulty Scoring", duration: "2 hrs" }
          ]
        },
        {
          id: "seo-m2",
          title: "Module 2: On-Page & Technical SEO",
          duration: "3 Weeks",
          lectures: [
            { title: "Title Tags, Meta Descriptions, Header Hierarchy & Image Alt", duration: "2 hrs" },
            { title: "Technical Site Audit with Screaming Frog", duration: "2.5 hrs" },
            { title: "Structured Data, Schema.org & Rich Snippets", duration: "2 hrs" },
            { title: "Google Search Console & Indexation Debugging", duration: "2 hrs" }
          ]
        },
        {
          id: "seo-m3",
          title: "Module 3: Off-Page SEO & Authority Building",
          duration: "3 Weeks",
          lectures: [
            { title: "Backlink Analysis, Domain Authority & Toxic Link Disavowal", duration: "2 hrs" },
            { title: "Guest Posting & Digital PR Outreach Strategies", duration: "2 hrs" },
            { title: "Local SEO: Google Business Profile (GBP) Optimization", duration: "2 hrs" },
            { title: "Monthly SEO Client Reporting & Retainer Contracts", duration: "2 hrs" }
          ]
        }
      ],
      published: true,
      order: 5,
      seoTitle: "SEO Course in Bahawalpur | DigitalExpert",
      seoDescription: "Become an SEO Specialist. Rank websites on Google Page 1. Practical training in Bahawalpur. Fee: 15,000 PKR."
    },
    {
      id: "course-youtube-automation",
      slug: "youtube-automation",
      title: "YouTube Automation & Faceless Channel Scaling",
      shortDescription: "Build automated, faceless YouTube cash-cow channels. Master viral niche selection, script generation, automated editing, and monetization.",
      description: "Discover how to build sustainable automated YouTube channels without showing your face on camera. Learn high-CPM niche selection, AI-assisted scriptwriting, voiceover synthesis, copyright-free B-roll curation, thumbnail click-through-rate (CTR) mastery, and scaling to \$2,000+/month with AdSense and brand sponsorships.",
      level: "All Levels",
      duration: "1.5 Months (18 Live Lectures)",
      scheduleText: "3 Days a Week (Tue, Thu, Sat) - 3:00 PM to 5:00 PM PKT",
      fee: 15000,
      oldFee: 22000,
      image: "/images/courses/youtube-automation.jpg",
      instructor: "Khezar Hayat",
      tools: ["VidIQ", "TubeBuddy", "Premiere Pro", "Canva Pro", "ChatGPT", "ElevenLabs"],
      whatYouWillLearn: [
        "Finding High-CPM, Low-Competition Faceless Niches",
        "Writing High-Retention YouTube Scripts with Story Arcs",
        "High-CTR Thumbnail Design with 15%+ Click-Through Rates",
        "Streamlined Video Production & Outsourcing Workflows",
        "YouTube SEO: Tags, Descriptions, Titles & End Screens",
        "Fast-Track YouTube Partner Program (YPP) Monetization"
      ],
      modules: [
        {
          id: "yt-m1",
          title: "Module 1: Niche Strategy & Channel Setup",
          duration: "2 Weeks",
          lectures: [
            { title: "Analyzing Profitable Niches: Finance, Tech, Top 10, Luxury", duration: "2 hrs" },
            { title: "Channel Branding: Banner, Watermark, Logo & SEO Setup", duration: "1.5 hrs" },
            { title: "Competitor Deconstruction & Identifying Viral Formats", duration: "2 hrs" }
          ]
        },
        {
          id: "yt-m2",
          title: "Module 2: Automation Content Factory",
          duration: "2 Weeks",
          lectures: [
            { title: "Scriptwriting Frameworks that Keep Viewers Hooked", duration: "2 hrs" },
            { title: "Voiceover Options: Natural AI vs Human Artists", duration: "1.5 hrs" },
            { title: "Efficient Faceless Video Editing with Stock Footage", duration: "2.5 hrs" }
          ]
        },
        {
          id: "yt-m3",
          title: "Module 3: CTR, SEO & Channel Monetization",
          duration: "2 Weeks",
          lectures: [
            { title: "Creating 10/10 Thumbnails that Demand Clicks", duration: "2 hrs" },
            { title: "Uploading Protocol, SEO Keywords & Best Publishing Times", duration: "1.5 hrs" },
            { title: "Monetization: AdSense, Affiliate Links & Sponsorships", duration: "2 hrs" }
          ]
        }
      ],
      published: true,
      order: 6,
      seoTitle: "YouTube Automation Course in Bahawalpur | DigitalExpert",
      seoDescription: "Build faceless YouTube channels and generate passive income. Complete automation blueprint. Fee: 15,000 PKR."
    }
  ],

  services: [
    {
      id: "service-wordpress",
      slug: "wordpress",
      name: "WordPress Website Development",
      shortDescription: "Custom, ultra-fast, responsive WordPress websites crafted to generate leads, showcase your brand, and turn visitors into paying customers.",
      overview: "We design and engineer bespoke WordPress websites tailored to your unique business goals. Every website is built from the ground up for maximum speed, seamless mobile responsiveness, modern visual aesthetics, and rock-solid security. Perfect for corporate brands, agencies, local businesses, and eCommerce shops.",
      image: "/images/services/wordpress.jpg",
      icon: "Laptop",
      deliverables: [
        "100% Mobile Responsive & Cross-Browser Tested",
        "Custom Visual Design tailored to your brand identity",
        "Clean, Easy-to-Use WordPress Admin Dashboard",
        "On-Page SEO Optimization & Fast Loading Setup",
        "WhatsApp Live Chat & Contact Form Integration",
        "Social Media & Google Analytics Connection",
        "30 Days of Free Post-Launch Technical Support"
      ],
      tools: ["WordPress", "Elementor Pro", "WooCommerce", "RankMath", "WP Rocket", "Cloudflare"],
      processSteps: [
        { step: 1, title: "Discovery & Wireframe", description: "We analyze your business, audience, and structure the page layout for conversion." },
        { step: 2, title: "Design & Brand Integration", description: "We craft custom visual designs using your logo, brand colors, and typography." },
        { step: 3, title: "Development & Optimization", description: "We build all pages in WordPress, test speed, integrate forms, and test on mobile." },
        { step: 4, title: "Launch & Training", description: "We connect your domain, install SSL, configure email, and provide a walkthrough." }
      ],
      packages: [
        {
          id: "wp-basic",
          name: "Basic Package",
          price: 30000,
          priceSuffix: "one-time",
          description: "Ideal for small businesses and service providers needing an online presence.",
          features: [
            "4 Professional Pages (Home, About, Services, Contact)",
            "Mobile & Tablet Responsive Layout",
            "Contact Form & WhatsApp Chat Integration",
            "Speed Optimization (Basic)",
            "Google Map Embed & Social Links",
            "Delivery in 5 to 7 Days"
          ],
          isPopular: false
        },
        {
          id: "wp-standard",
          name: "Standard Package",
          price: 50000,
          priceSuffix: "one-time",
          description: "Our most popular package for established companies looking to generate leads.",
          features: [
            "Up to 8 Custom Pages",
            "Advanced Animations & Modern Micro-interactions",
            "On-Page SEO & Schema Markup",
            "Blog / News Section Setup",
            "Google Analytics 4 & Meta Pixel Setup",
            "High Speed Optimization (90+ Mobile Score)",
            "Delivery in 10 to 14 Days"
          ],
          isPopular: true
        },
        {
          id: "wp-premium",
          name: "Premium Package",
          price: 70000,
          priceSuffix: "one-time",
          description: "Complete full-scale corporate website or eCommerce store with custom requirements.",
          features: [
            "10+ Custom Pages or Full WooCommerce Store",
            "eCommerce Shop Setup & Payment Gateways",
            "Custom Post Types, Filters & Portfolios",
            "Advanced Security & Malware Protection",
            "Priority Support & 30 Days Maintenance",
            "Delivery in 18 to 21 Days"
          ],
          isPopular: false
        }
      ],
      faqs: [
        { question: "Can I easily update text and images myself?", answer: "Yes! We build on WordPress with an intuitive visual editor, so you can edit words, upload pictures, and post blogs without any coding knowledge." },
        { question: "Is domain and hosting included?", answer: "We assist you in selecting and configuring the best domain and cloud hosting. If you already have hosting, we will deploy directly to your server." },
        { question: "How long does a website take to build?", answer: "A Basic 4-page website takes 5-7 days, Standard takes 10-14 days, and Premium takes around 2-3 weeks." }
      ],
      published: true,
      order: 1,
      seoTitle: "WordPress Website Development Services | DigitalExpert",
      seoDescription: "Professional WordPress website design and development by DigitalExpert in Bahawalpur. Packages starting from 30,000 PKR."
    },
    {
      id: "service-seo",
      slug: "seo",
      name: "Search Engine Optimization (SEO)",
      shortDescription: "Rank your business at the top of Google search results, capture high-intent buyers, and generate continuous organic traffic.",
      overview: "Search Engine Optimization is the highest-ROI digital marketing channel. We implement data-backed white-hat SEO strategies that solve technical errors, optimize keyword-targeted landing pages, create authoritative content, and earn high-quality backlinks. We help you dominate competitive search queries and outrank competitors.",
      image: "/images/services/seo.jpg",
      icon: "Search",
      deliverables: [
        "Comprehensive Website Technical SEO Audit",
        "High-Intent Commercial Keyword Research & Mapping",
        "Full On-Page Optimization (Meta, H-Tags, Internal Links)",
        "Google Business Profile (Local SEO) Optimization",
        "Content Strategy & Blog Topic Clustering",
        "Ethical White-Hat Backlink Outreach",
        "Monthly Progress & Keyword Ranking Reports"
      ],
      tools: ["Ahrefs", "SEMrush", "Google Search Console", "Google Analytics", "Screaming Frog"],
      processSteps: [
        { step: 1, title: "Technical Audit & Baseline", description: "We run a deep crawl to uncover indexation issues, broken links, and site speed bottlenecks." },
        { step: 2, title: "Keyword & Competitor Strategy", description: "We identify terms your potential customers search for and analyze your top ranking rivals." },
        { step: 3, title: "On-Page & Content Optimization", description: "We optimize title tags, content structure, schema markup, and internal link architecture." },
        { step: 4, title: "Authority Building & Reporting", description: "We acquire high-trust backlinks and provide transparent monthly ranking performance reports." }
      ],
      packages: [
        {
          id: "seo-monthly",
          name: "Monthly SEO Retainer",
          price: 20000,
          priceSuffix: "per month",
          description: "Complete hands-off monthly SEO service to rank your website on Google Page 1.",
          features: [
            "Complete Technical SEO Fixes & Monitoring",
            "15 to 20 Target Keywords Tracked",
            "Full On-Page Optimization for Target Pages",
            "Google Business Profile (Local Maps) Ranking",
            "Monthly Quality Backlink Building",
            "Google Search Console & GA4 Performance Monitoring",
            "Comprehensive Monthly PDF Ranking Report"
          ],
          isPopular: true
        }
      ],
      faqs: [
        { question: "How long before we see ranking improvements?", answer: "SEO is a compound growth strategy. Initial technical and indexation improvements show in 3 to 6 weeks, with substantial ranking jumps and organic traffic increases typically occurring between months 2 and 4." },
        { question: "Do you use safe white-hat techniques?", answer: "Absolutely. We strictly adhere to Google Search Essentials and Webmaster Guidelines to ensure long-term, penalty-proof rankings." }
      ],
      published: true,
      order: 2,
      seoTitle: "Monthly SEO Services in Pakistan | DigitalExpert",
      seoDescription: "Rank on Google Page 1 with DigitalExpert's monthly SEO package. 20,000 PKR per month. Transparent reports & measurable growth."
    },
    {
      id: "service-social-media",
      slug: "social-media",
      name: "Social Media Marketing",
      shortDescription: "Build a memorable brand presence, engage targeted audiences, and turn social followers into brand advocates on Facebook & Instagram.",
      overview: "We take full ownership of your social media platforms. From strategic content calendars, brand aesthetic design, and high-impact Reels to community management and daily posting, we ensure your business looks world-class and builds real authority in your industry.",
      image: "/images/services/social-media.jpg",
      icon: "Share2",
      deliverables: [
        "Custom Visual Branding & Grid Aesthetic",
        "High-Converting Direct Response Copywriting",
        "Custom Graphic Posts & Carousel Slides",
        "Short-Form Video (Reels / TikTok) Editing",
        "Hashtag & Audience Research",
        "Daily Scheduled Publishing & Community Engagement",
        "Bi-Weekly / Monthly Analytics Reporting"
      ],
      tools: ["Canva Pro", "Adobe Illustrator", "CapCut", "Meta Business Suite", "Metricool"],
      processSteps: [
        { step: 1, title: "Brand Voice & Visual Guide", description: "We define your color palette, tone of voice, content pillars, and design style." },
        { step: 2, title: "Monthly Content Calendar", description: "We outline all post topics, captions, and creative briefs for your approval." },
        { step: 3, title: "Design & Video Production", description: "Our team crafts engaging carousels, graphic posts, and short-form videos." },
        { step: 4, title: "Publishing & Engagement", description: "We schedule posts at peak audience times and monitor comments and messages." }
      ],
      packages: [
        {
          id: "smm-weekly",
          name: "Weekly Package",
          price: 15000,
          priceSuffix: "per week",
          description: "Rapid short-term promotional boost or event campaign.",
          features: [
            "7 Days Full Management",
            "5 High-Quality Graphic Posts / Carousels",
            "2 Short-Form Reels / Videos",
            "Hashtag & Caption Optimization",
            "Daily Story Updates"
          ],
          isPopular: false
        },
        {
          id: "smm-15days",
          name: "15 Days Package",
          price: 25000,
          priceSuffix: "for 15 days",
          description: "Targeted mid-month brand campaign and engagement sprint.",
          features: [
            "15 Days Dedicated Management",
            "10 High-Quality Graphic Posts",
            "4 Edited Reels / Videos",
            "Story Strategy & Audience Engagement",
            "Performance Review at Day 15"
          ],
          isPopular: false
        },
        {
          id: "smm-monthly",
          name: "Monthly Package",
          price: 50000,
          priceSuffix: "per month",
          description: "Complete full-service monthly social media management for maximum growth.",
          features: [
            "30 Days Complete Social Media Takeover",
            "20 Custom Branded Graphic Posts / Carousels",
            "8 High-Retention Viral Reels / TikToks",
            "Daily Instagram & Facebook Stories",
            "Community Management & DM Monitoring",
            "Dedicated Account Manager",
            "Monthly Analytics & ROI Growth Report"
          ],
          isPopular: true
        }
      ],
      faqs: [
        { question: "Do you create the graphics and write the captions?", answer: "Yes, our team handles everything from research and copywriting to graphic design, video editing, and posting." },
        { question: "Can we review posts before they go live?", answer: "Yes! We share the content calendar with you in advance for your review and approval before scheduling." }
      ],
      published: true,
      order: 3,
      seoTitle: "Social Media Marketing Agency | DigitalExpert",
      seoDescription: "Grow your brand on Facebook and Instagram with DigitalExpert. Packages: Weekly 15,000, 15 Days 25,000, Monthly 50,000 PKR."
    },
    {
      id: "service-google-tiktok-ads",
      slug: "google-tiktok-ads",
      name: "Google & TikTok Ads Management",
      shortDescription: "Laser-targeted paid ad campaigns engineered to generate immediate leads, qualified calls, and eCommerce sales at the lowest cost per acquisition.",
      overview: "Stop wasting your marketing budget on unoptimized ads. We build, manage, and scale data-driven paid advertising campaigns on Google Ads (Search, Display, YouTube) and TikTok Ads. We handle complete pixel setup, server-side conversion tracking, ad copywriting, split testing, and aggressive budget scaling.",
      image: "/images/services/google-tiktok-ads.jpg",
      icon: "Target",
      deliverables: [
        "Account Audit & Campaign Structure Setup",
        "Competitor Ad Analysis & Keyword Selection",
        "Conversion Tracking Setup (Pixel + GTM + GA4)",
        "Compelling Ad Copy & Headline Variations",
        "Negative Keyword Lists to Prevent Wasted Spend",
        "Daily Bid Management & Quality Score Optimization",
        "Real-Time Live Performance Dashboard"
      ],
      tools: ["Google Ads", "TikTok Ads Manager", "Google Tag Manager", "GA4", "Looker Studio"],
      processSteps: [
        { step: 1, title: "Tracking & Funnel Audit", description: "We ensure pixels, conversion events, and landing pages track accurately." },
        { step: 2, title: "Audience & Keyword Research", description: "We locate high-intent buyers and pinpoint high-converting keywords and interests." },
        { step: 3, title: "Campaign Launch & A/B Testing", description: "We launch multi-ad sets testing different angles, hooks, and bidding models." },
        { step: 4, title: "Scaling & Optimization", description: "We cut non-performing ad groups and pour budget into winning creatives." }
      ],
      packages: [
        {
          id: "ads-weekly",
          name: "Weekly Management",
          price: 15000,
          priceSuffix: "per week",
          description: "Short burst campaign management or initial ad testing.",
          features: [
            "Campaign Setup & Tracking Verification",
            "1 Advertising Platform (Google or TikTok)",
            "A/B Testing 3 Ad Variations",
            "Daily Negative Keyword & Bid Adjustments",
            "End of Week Performance Summary"
          ],
          isPopular: false
        },
        {
          id: "ads-15days",
          name: "15 Days Management",
          price: 25000,
          priceSuffix: "for 15 days",
          description: "Solid test and optimization window for seasonal sales or launches.",
          features: [
            "15 Days Active Campaign Management",
            "Up to 2 Platforms (Google & TikTok)",
            "Audience Retargeting Setup",
            "Budget Optimization & Bid Strategy Refinement",
            "Bi-Weekly Reporting Call"
          ],
          isPopular: false
        },
        {
          id: "ads-monthly",
          name: "Monthly Management",
          price: 50000,
          priceSuffix: "per month",
          description: "Comprehensive full-funnel media buying and scaling for serious brands.",
          features: [
            "30 Days Complete Media Buying & Account Management",
            "Full Multi-Platform Coverage (Google Search, P-Max & TikTok)",
            "Advanced Server-Side Conversion API Setup",
            "Continuous Creative Split Testing & Copy Refresh",
            "Retargeting Funnels for Maximum ROAS",
            "Dedicated Media Buyer & Weekly Strategy Reports"
          ],
          isPopular: true
        }
      ],
      faqs: [
        { question: "Is the ad spend included in the package price?", answer: "No, package prices cover our professional campaign setup, management, copywriting, and optimization. Ad spend is paid directly to Google/TikTok through your card." },
        { question: "How much ad budget should I start with?", answer: "We advise starting with at least Rs 1,500 to Rs 3,000 per day depending on your niche, which allows the algorithm to gather sufficient conversion data." }
      ],
      published: true,
      order: 4,
      seoTitle: "Google & TikTok Ads Agency | DigitalExpert",
      seoDescription: "Data-driven Google & TikTok ads management. Scale your leads and sales. Packages: Weekly 15,000, 15 Days 25,000, Monthly 50,000 PKR."
    },
    {
      id: "service-video-ads",
      slug: "video-ads",
      name: "Video Ads Creation",
      shortDescription: "High-retention commercial video ads (30 to 40 seconds) designed specifically to grab attention in 3 seconds and drive clicks.",
      overview: "Video ads are the single most effective way to communicate your offer online. We produce punchy, commercial-grade 30-to-40 second video ads formatted for Instagram Reels, TikTok, and Facebook Ads. From persuasive hook scripting and dynamic typography to product showcases and sound effects, our ads are built to convert.",
      image: "/images/services/video-ads.jpg",
      icon: "Video",
      deliverables: [
        "Professional 30 to 40 Second Commercial Video Ad",
        "High-Retention 3-Second Scroll-Stopping Hook",
        "Clean Animated Subtitles & Highlight Keywords",
        "Licensed Background Music & Dynamic Sound Effects",
        "High-Resolution 1080x1920 (9:16 Vertical) + 1:1 Square Formats",
        "1 Free Round of Revision Included",
        "Fast 48 to 72 Hour Turnaround"
      ],
      tools: ["Adobe Premiere Pro", "After Effects", "CapCut Desktop", "Photoshop", "ElevenLabs"],
      processSteps: [
        { step: 1, title: "Brief & Hook Scripting", description: "You tell us your product or service, and we write a 30-40s direct response script." },
        { step: 2, title: "Asset Sourcing & Voiceover", description: "We record or sync high-energy voiceover and curate product footage." },
        { step: 3, title: "Dynamic Motion Editing", description: "We edit with rapid cuts, kinetic typography, b-roll, and engaging audio effects." },
        { step: 4, title: "Delivery & Revisions", description: "We deliver ready-to-run video ad files in all social media dimensions." }
      ],
      packages: [
        {
          id: "video-ad-single",
          name: "Commercial Video Ad (30-40 Seconds)",
          price: 5000,
          priceSuffix: "per video ad",
          description: "One complete, ready-to-launch commercial video ad engineered for maximum CTR.",
          features: [
            "30 to 40 Seconds Duration",
            "Scroll-Stopping 3-Second Hook",
            "Dynamic Animated Subtitles & Motion Graphics",
            "High-Quality Voiceover & Sound Effects (SFX)",
            "Delivered in 9:16 (Story/Reel) and 1:1 (Feed) formats",
            "Fast 48-Hour Delivery"
          ],
          isPopular: true
        }
      ],
      faqs: [
        { question: "What is the exact duration of each video ad?", answer: "Each video ad is carefully edited to be between 30 and 40 seconds long, which is proven to yield the highest retention and conversion rates on paid social media." },
        { question: "Do I need to send my own footage?", answer: "If you have product photos or clips, send them! If not, we can produce stunning ads using licensed high-definition stock footage, screen recordings, and graphic animations." }
      ],
      published: true,
      order: 5,
      seoTitle: "Commercial Video Ads Creation | DigitalExpert",
      seoDescription: "Convert more customers with 30-40 second video ads. 5,000 PKR per video ad. High retention, professional voiceovers & sound design."
    },
    {
      id: "service-youtube-automation",
      slug: "youtube-automation",
      name: "YouTube Automation & Management",
      shortDescription: "Turnkey faceless YouTube channel development, high-CTR thumbnail design, automated production workflows, and channel monetization.",
      overview: "We help investors, entrepreneurs, and content creators launch and scale automated YouTube channels. We handle everything: high-CPM niche selection, viral topic research, scriptwriting, voiceovers, video production, click-worthy thumbnail design, and YouTube SEO optimization.",
      image: "/images/services/youtube-automation.jpg",
      icon: "Youtube",
      deliverables: [
        "High-CPM Niche & Competitor Research",
        "Engaging 8 to 12 Minute Script Production",
        "Professional Voiceovers & Video Editing",
        "High-CTR Custom 3D Thumbnails (15%+ CTR)",
        "Complete YouTube SEO (Title, Tags, Description)",
        "Publishing, Community Posts & Channel Management",
        "Monetization & Sponsorship Advisory"
      ],
      tools: ["VidIQ", "TubeBuddy", "Premiere Pro", "Photoshop", "ElevenLabs", "Midjourney"],
      processSteps: [
        { step: 1, title: "Channel Blueprint", description: "We identify your target niche, analyze the top 1% channels, and design your channel branding." },
        { step: 2, title: "Content Pipeline", description: "Our scriptwriters and video editors produce ready-to-rank long-form videos." },
        { step: 3, title: "Thumbnail & SEO", description: "We design irresistible thumbnails and optimize metadata for the YouTube algorithm." },
        { step: 4, title: "Upload & Monetize", description: "We schedule videos, engage with viewers, and fast-track channel monetization." }
      ],
      packages: [
        {
          id: "yt-custom",
          name: "Custom YouTube Automation Plan",
          price: null,
          isCustomQuote: true,
          priceSuffix: "custom quote",
          description: "Bespoke channel package tailored to your target niche, publishing frequency, and scaling goals.",
          features: [
            "Complete End-to-End Production Pipeline",
            "High-Retention Scriptwriting & Professional Voiceover",
            "Full 1080p / 4K Video Editing with B-roll & Motion Graphics",
            "Custom High-CTR Thumbnails tested against competitors",
            "Complete Video Upload & YouTube SEO Optimization",
            "Direct WhatsApp Strategy Support with Khezar Hayat"
          ],
          isPopular: true
        }
      ],
      faqs: [
        { question: "How does pricing work for YouTube Automation?", answer: "Because publishing frequency (e.g., 4 videos vs 12 videos/month) and production depth vary widely by niche, we provide custom quotes. Message us on WhatsApp to discuss your channel vision." },
        { question: "Do I have to appear on camera?", answer: "No! All channels we produce are 100% faceless automation channels using stock footage, animations, voiceovers, and dynamic motion graphics." }
      ],
      published: true,
      order: 6,
      seoTitle: "YouTube Automation Agency in Pakistan | DigitalExpert",
      seoDescription: "Automate and scale your faceless YouTube channels with DigitalExpert. High CPM niches, viral thumbnails, and end-to-end production."
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "Gulf Elite Real Estate Portal",
      category: "WordPress",
      clientType: "Real Estate Firm (Dubai, UAE)",
      image: "/brand/digital-website.jpg",
      resultText: "Built a 12-page luxury property portal with dynamic filters and WhatsApp CRM integration. Generated 450+ qualified property investor leads in the first 60 days.",
      link: "https://digitalexpert.pk/projects/gulf-elite",
      featured: true,
      isSample: true,
      order: 1
    },
    {
      id: "proj-2",
      title: "Al-Noor Medical Center SEO Campaign",
      category: "SEO",
      clientType: "Healthcare Provider (Riyadh, Saudi Arabia)",
      image: "/brand/digital-ads-seo.jpg",
      resultText: "Achieved Google Page 1 rankings for 28 high-intent medical keywords in 90 days. Boosted organic patient appointments by 210%.",
      link: "https://digitalexpert.pk/projects/al-noor",
      featured: true,
      isSample: true,
      order: 2
    },
    {
      id: "proj-3",
      title: "Oasis Fashion Social Media Growth",
      category: "Social Media",
      clientType: "Apparel Brand (London, UK)",
      image: "/brand/digital-social-media.jpg",
      resultText: "Executed a 30-day viral Reels strategy that grew the Instagram community from 4,000 to 38,000 followers and drove £24,000 in direct website orders.",
      link: "https://digitalexpert.pk/projects/oasis-fashion",
      featured: true,
      isSample: true,
      order: 3
    },
    {
      id: "proj-4",
      title: "Apex Solar Google Ads Lead Generation",
      category: "Ads",
      clientType: "Solar Energy Contractor (Islamabad, Pakistan)",
      image: "/brand/digital-marketing-workspace.png",
      resultText: "Engineered Google Search & Performance Max campaigns with a 5.8x ROAS, reducing cost-per-lead by 42% and generating 180+ residential solar quotes.",
      link: "https://digitalexpert.pk/projects/apex-solar",
      featured: true,
      isSample: true,
      order: 4
    },
    {
      id: "proj-5",
      title: "E-Commerce Footwear Commercial Video Ad",
      category: "Video",
      clientType: "DTC Footwear Brand (Lahore, Pakistan)",
      image: "/brand/digital-academy.jpg",
      resultText: "Produced a high-tempo 35-second video ad with kinetic typography. Achieved a 4.1% CTR on TikTok Ads and over 1,200 pairs sold in 3 weeks.",
      link: "https://digitalexpert.pk/projects/footwear-video-ad",
      featured: true,
      isSample: true,
      order: 5
    },
    {
      id: "proj-6",
      title: "FinTech Insights Faceless Channel",
      category: "YouTube",
      clientType: "Media Publisher (International)",
      image: "/brand/digital-website.jpg",
      resultText: "Launched a faceless personal finance YouTube channel, producing 16 automated videos. Reached YouTube Monetization in 45 days with 1.2M total views.",
      link: "https://digitalexpert.pk/projects/fintech-channel",
      featured: true,
      isSample: true,
      order: 6
    },
    {
      id: "proj-7",
      title: "Skyline Logistics Corporate Website",
      category: "WordPress",
      clientType: "Freight & Shipping Company (Dubai, UAE)",
      image: "/brand/digital-marketing-workspace.png",
      resultText: "Delivered a lightning-fast 8-page corporate website with tracking portal integration. 98 Mobile Lighthouse score and 0.8s load time.",
      link: "https://digitalexpert.pk/projects/skyline-logistics",
      featured: false,
      isSample: true,
      order: 7
    },
    {
      id: "proj-8",
      title: "Dental Excellence Local SEO & GBP",
      category: "SEO",
      clientType: "Dental Clinic (Birmingham, UK)",
      image: "/brand/digital-ads-seo.jpg",
      resultText: "Ranked #1 on Google Local 3-Pack for 'best cosmetic dentist'. Increased phone inquiries by 185% in 4 months.",
      link: "https://digitalexpert.pk/projects/dental-excellence",
      featured: false,
      isSample: true,
      order: 8
    },
    {
      id: "proj-9",
      title: "Gourmet Cloud Kitchen TikTok Ads",
      category: "Ads",
      clientType: "Food Delivery Brand (Dubai, UAE)",
      image: "/brand/digital-social-media.jpg",
      resultText: "Ran localized TikTok Spark Ads reaching 400,000+ local foodies. Generated over 3,200 online food orders with a \$1.15 CPA.",
      link: "https://digitalexpert.pk/projects/gourmet-cloud-kitchen",
      featured: false,
      isSample: true,
      order: 9
    },
    {
      id: "proj-10",
      title: "Smart Gadgets 30s Product Video Ad",
      category: "Video",
      clientType: "Tech Accessories Store (Karachi, Pakistan)",
      image: "/brand/digital-academy.jpg",
      resultText: "Crafted 3 variations of 30-second commercial video ads. Generated 6.2x return on ad spend on Meta Advantage+ campaigns.",
      link: "https://digitalexpert.pk/projects/smart-gadgets",
      featured: false,
      isSample: true,
      order: 10
    }
  ],

  testimonials: [
    {
      id: "test-1",
      name: "Tariq Mansoor",
      role: "Managing Director, Al-Mansoor Real Estate",
      country: "Dubai, United Arab Emirates",
      text: "Working with Khezar and the DigitalExpert team was a turning point for our agency in Dubai. They built an exceptional website that loads in under a second and manages all our property inquiries effortlessly. Their professionalism and technical mastery are unmatched. Highly recommended!",
      photo: "/brand/digital-academy.jpg",
      rating: 5,
      isSample: true
    },
    {
      id: "test-2",
      name: "Sarah Jenkins",
      role: "Founder, Luxe Living UK",
      country: "London, United Kingdom",
      text: "DigitalExpert completely restructured our social media campaigns and SEO. Within 3 months, our organic organic rankings skyrocketed and our lead cost on Google Ads dropped by over 40%. The communication on WhatsApp is always fast and transparent.",
      photo: "/brand/digital-website.jpg",
      rating: 5,
      isSample: true
    },
    {
      id: "test-3",
      name: "Fahad Al-Subaie",
      role: "Operations Head, Gulf Horizon Trading",
      country: "Riyadh, Saudi Arabia",
      text: "The quality of video ads and landing page design delivered by DigitalExpert exceeded all our expectations. They understand international business standards and deliver ahead of schedule every single time. A truly reliable partner.",
      photo: "/brand/digital-marketing-workspace.png",
      rating: 5,
      isSample: true
    }
  ],

  team: [
    {
      id: "team-khezar",
      name: "Khezar Hayat",
      role: "Founder & Lead Digital Strategist",
      photo: "/brand/khezar-hayat.png",
      description: "Founder of DigitalExpert with over 5 years of hands-on expertise in digital marketing, web engineering, and performance marketing. Successfully scaled campaigns for 300+ clients across the UAE, Saudi Arabia, the UK, and Pakistan.",
      experienceBadge: "5+ YEARS EXP.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/khezarhayat",
        facebook: "https://facebook.com/digitalexpertpk",
        instagram: "https://instagram.com/digitalexpertpk",
        youtube: "https://youtube.com/@digitalexpertpk"
      },
      order: 1
    },
    {
      id: "team-umar",
      name: "Umar Farooq",
      role: "Manager & Operations Director",
      photo: "/brand/umar-farooq.png",
      description: "Oversees agency operations, student enrollment verification, client communication, and project delivery schedules. Dedicated to ensuring every client and student receives world-class support and seamless execution.",
      experienceBadge: "OPERATIONS LEAD",
      socialLinks: {
        linkedin: "https://linkedin.com/in/umarfarooq",
        facebook: "https://facebook.com/digitalexpertpk"
      },
      order: 2
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "Where is the DigitalExpert office located?",
      answer: "Our physical institute and agency headquarters are conveniently located at University Chowk, Bahawalpur, Punjab, Pakistan. You are always welcome to visit us in person for consultations and admissions.",
      group: "General",
      order: 1
    },
    {
      id: "faq-2",
      question: "Are your courses practical or theoretical?",
      answer: "All courses at DigitalExpert are 100% practical and project-driven. You work on live websites, real client ad budgets, and hands-on design assignments under the personal mentorship of Khezar Hayat.",
      group: "Courses",
      order: 2
    },
    {
      id: "faq-3",
      question: "Do you offer certificates after course completion?",
      answer: "Yes! Every student who successfully finishes the required practical projects and submits all module assignments receives an official DigitalExpert Course Completion Certificate.",
      group: "Courses",
      order: 3
    },
    {
      id: "faq-4",
      question: "How does the admission and enrollment process work?",
      answer: "Click the 'Enroll Now' button on any course, fill in your details, transfer the course fee using JazzCash, EasyPaisa, or Bank Transfer, and upload a clear screenshot of your payment receipt. Once our team verifies your screenshot in the admin portal, your admission is officially confirmed on WhatsApp and email.",
      group: "Admission",
      order: 4
    },
    {
      id: "faq-5",
      question: "What payment methods do you accept?",
      answer: "We accept JazzCash, EasyPaisa, and direct Bank Transfer (online banking / mobile app). Full account numbers and titles are displayed on the enrollment page and inside the invoice.",
      group: "Payment",
      order: 5
    },
    {
      id: "faq-6",
      question: "Can international clients hire your agency for services?",
      answer: "Yes, we currently serve 300+ clients across the UAE, Saudi Arabia, the United Kingdom, India, and beyond. We accept international payments via bank wire, Wise, and Payoneer.",
      group: "Services",
      order: 6
    },
    {
      id: "faq-7",
      question: "How do we get started with an agency service project?",
      answer: "You can click 'Get Free Quote' on any service page or chat directly with our founder on WhatsApp at 03124051296. We discuss your project scope, provide an exact proposal, and begin work upon deposit.",
      group: "Services",
      order: 7
    }
  ],

  pages: [
    {
      id: "page-privacy",
      slug: "privacy",
      title: "Privacy Policy",
      lastUpdated: "October 16, 2026",
      seoTitle: "Privacy Policy | DigitalExpert",
      seoDescription: "How DigitalExpert collects, uses and protects your personal information and payment screenshots.",
      content: `
<h2>Privacy Policy</h2>
<p><em>How DigitalExpert collects, uses and protects your information when you use digitalexpert.pk, contact us or enrol in a course.</em></p>

<h3>Information we collect</h3>
<p>We collect only what we need to help you:</p>
<ul>
  <li>Your name, email address, phone or WhatsApp number and city when you fill in a form.</li>
  <li>The course or service you are interested in.</li>
  <li>Payment screenshots and transaction details you upload when you enrol.</li>
  <li>Basic usage data, such as pages visited, to improve the website.</li>
</ul>

<h3>How we use your information</h3>
<ul>
  <li>To reply to your enquiries and quote requests.</li>
  <li>To process your enrolment, verify your payment and confirm your admission.</li>
  <li>To send you updates about your batch, classes and certificate.</li>
  <li>To improve our website, courses and services.</li>
</ul>

<h3>Payment screenshots</h3>
<p>Payment screenshots are used only to verify your payment. They are stored in private secure storage, visible exclusively to authorised DigitalExpert staff, and are never made publicly accessible or shared with third parties.</p>

<h3>Sharing your information</h3>
<p>We do not sell your personal information. We share it only with trusted service providers that help us run the website, such as hosting and email delivery, and when required by applicable law.</p>

<h3>Keeping your information safe</h3>
<p>We use encrypted SSL connections and limit access to administrative staff. No online system is completely risk-free, so contact us straight away if you suspect any unauthorized activity.</p>

<h3>How long we keep it</h3>
<p>We keep your information for as long as needed for admissions records, accounting, and legal compliance. After that, records are securely archived or deleted.</p>

<h3>Your choices</h3>
<p>You can ask us to correct or delete your information, or stop receiving updates, by emailing <strong>info@digitalexpert.pk</strong> or messaging us on WhatsApp at <strong>03124051296</strong>.</p>
`
    },
    {
      id: "page-terms",
      slug: "terms",
      title: "Terms of Service",
      lastUpdated: "October 16, 2026",
      seoTitle: "Terms of Service | DigitalExpert",
      seoDescription: "The rules for using our website, enrolling in courses, and ordering digital marketing services.",
      content: `
<h2>Terms of Service</h2>
<p><em>The rules for using our website, enrolling in our courses and ordering our services.</em></p>

<h3>Using this website</h3>
<p>You agree to use the website lawfully. Please do not misuse our forms, upload harmful or malicious files, or copy our copyrighted content without prior written permission.</p>

<h3>Courses and services</h3>
<p>Course and service descriptions, fees and packages are shown in Pakistani rupees (PKR) and may change. The fee shown when you enrol or order is the fee that applies to your registration.</p>
<p>Batch start dates and class timings are coordinated and shared on WhatsApp and may be adjusted with advance notice.</p>

<h3>Enrolment and admission</h3>
<p><strong>Submitting the enrolment form does not confirm your admission.</strong></p>
<p>Your admission is confirmed only after we receive your valid payment screenshot, verify the transaction with our accounts department, and confirm your seat via WhatsApp or email notification.</p>

<h3>Student conduct</h3>
<p>Students are expected to behave respectfully toward instructors and peers in physical classes and group discussions. We reserve the right to remove any individual who disrupts learning or violates classroom guidelines.</p>

<h3>Course content and certificates</h3>
<p>Course lectures, recordings, templates, and materials are solely for your personal education. They may not be redistributed, resold, or shared publicly. Certificates are issued upon completing the required curriculum and practical assignments.</p>

<h3>Results</h3>
<p>We teach practical, market-proven skills and deliver marketing services with utmost care. However, we cannot guarantee specific financial gains, specific income figures, or guaranteed employment outcomes.</p>

<h3>Changes to these terms</h3>
<p>We may update these terms from time to time. The latest version published on this page is the one in effect.</p>
`
    },
    {
      id: "page-refund",
      slug: "refund",
      title: "Refund Policy",
      lastUpdated: "October 16, 2026",
      seoTitle: "Refund Policy | DigitalExpert",
      seoDescription: "When refunds are possible for training courses and digital marketing service packages.",
      content: `
<h2>Refund Policy</h2>
<p><em>When a refund is possible for course fees and service packages. Please read this before making a payment.</em></p>

<h3>Courses</h3>
<p>If you request a refund before your batch start date, and within <strong>7 days</strong> of payment, we refund the course fee after deducting standard payment transfer charges.</p>
<p>Once classes begin, course fees are non-refundable, as classroom seats and mentor time are reserved in advance. Exceptional cases are evaluated strictly at our discretion.</p>

<h3>Service packages</h3>
<p>Agency service packages are refundable only before kickoff and before creative or technical work has commenced.</p>
<p>Once design, development, or ad setup has started, the completed portion is non-refundable. We will discuss and reconcile any unused project balance in good faith.</p>

<h3>If we cancel</h3>
<p>If DigitalExpert cancels a scheduled training batch or is unable to deliver an agreed-upon service, you may choose between a prompt 100% full refund or transferring your balance to a future batch or service.</p>

<h3>How to request a refund</h3>
<ul>
  <li>Message us on WhatsApp at <strong>03124051296</strong> or email <strong>info@digitalexpert.pk</strong> with your full name, course/service, and payment receipt.</li>
  <li>We review and respond within <strong>2 working days</strong>.</li>
  <li>Approved refunds are processed to your original payment account within <strong>7 working days</strong>.</li>
</ul>
`
    },
    {
      id: "page-payment",
      slug: "payment",
      title: "Payment Policy",
      lastUpdated: "October 16, 2026",
      seoTitle: "Payment Policy | DigitalExpert",
      seoDescription: "How to pay for courses and agency services, accepted methods, and verification rules.",
      content: `
<h2>Payment Policy</h2>
<p><em>How to pay for a course or service, and how your admission is confirmed.</em></p>

<h3>How to enrol and pay</h3>
<ul>
  <li>Open the course you want and click <strong>Enroll Now</strong>.</li>
  <li>Fill in the enrollment form with your accurate details.</li>
  <li>Pay the exact course fee via one of our accepted payment options.</li>
  <li><strong>Upload a clear screenshot or receipt of your transaction. The form cannot be submitted without this screenshot.</strong></li>
  <li>Our team verifies the payment and issues your admission confirmation on WhatsApp and email.</li>
</ul>

<h3>Accepted payment methods</h3>
<p>We accept <strong>JazzCash, EasyPaisa, and Direct Bank Transfer</strong>. Official account numbers and titles are listed on the enrollment page and provided by our administrative desk.</p>

<h3>Admission confirmation</h3>
<p>Your admission seat is reserved only upon successful payment verification. Verification is typically completed within <strong>24 hours</strong>. If you do not hear back within 24 hours, please message our WhatsApp desk at <strong>03124051296</strong> with your transaction ID.</p>

<h3>Service payments</h3>
<p>Agency service packages require an upfront milestone deposit as agreed before work begins. Monthly retainer packages are billed and payable at the start of each service cycle.</p>

<h3>Currency & receipts</h3>
<p>All fees are denominated in Pakistani Rupees (PKR) unless an international invoice is explicitly issued. Always retain your digital receipt until your service or admission is finalized.</p>
`
    },
    {
      id: "page-cookies",
      slug: "cookies",
      title: "Cookie Policy",
      lastUpdated: "October 16, 2026",
      seoTitle: "Cookie Policy | DigitalExpert",
      seoDescription: "Information regarding cookies and browser storage used on digitalexpert.pk.",
      content: `
<h2>Cookie Policy</h2>
<p><em>What small pieces of data our website stores in your browser, and why.</em></p>

<h3>What we store</h3>
<ul>
  <li><strong>Your name:</strong> If you enter your name in our welcome popup, we store it in your browser's local storage so we can greet you personally upon your return.</li>
  <li><strong>Session preferences:</strong> Temporary session cookies to remember filter selections and form states.</li>
  <li><strong>Security cookies:</strong> Encrypted, HTTP-only tokens used exclusively to authenticate admin dashboard sessions.</li>
  <li><strong>Analytics:</strong> Anonymous visit statistics to help us monitor performance and optimize user experience.</li>
</ul>

<h3>Why we use them</h3>
<p>These lightweight cookies allow our website to navigate smoothly, protect administrative routes, and ensure fast page loads.</p>

<h3>Your control</h3>
<p>You can clear cookies or block them at any time in your browser settings. The public website remains fully functional without non-essential cookies.</p>
`
    }
  ],

  enrollments: [],
  messages: [],
  media: [
    {
      id: "med-1",
      name: "digital-expert-logo.png",
      url: "/brand/digital-expert-logo.png",
      size: 578276,
      mimeType: "image/png",
      altText: "DigitalExpert Official Logo",
      uploadedAt: "2026-10-16T12:00:00.000Z"
    },
    {
      id: "med-2",
      name: "khezar-hayat.png",
      url: "/brand/khezar-hayat.png",
      size: 347529,
      mimeType: "image/png",
      altText: "Khezar Hayat - Founder of DigitalExpert",
      uploadedAt: "2026-10-16T12:00:00.000Z"
    },
    {
      id: "med-3",
      name: "umar-farooq.png",
      url: "/brand/umar-farooq.png",
      size: 2705163,
      mimeType: "image/png",
      altText: "Umar Farooq - Manager of DigitalExpert",
      uploadedAt: "2026-10-16T12:00:00.000Z"
    }
  ],

  users: [
    {
      id: "user-admin",
      email: "admin@digitalexpert.pk",
      name: "Khezar Hayat (Admin)",
      role: "admin",
      // Hash for "DigitalExpertAdmin2026!"
      passwordHash: "$2a$10$/ZnUdMAt3ef2umS53bM63.PzAdUWvXHqrZUwOZLUPO0VUi7qAw.sy",
      createdAt: "2026-10-16T12:00:00.000Z"
    },
    {
      id: "user-manager",
      email: "manager@digitalexpert.pk",
      name: "Umar Farooq (Manager)",
      role: "manager",
      passwordHash: "$2a$10$/ZnUdMAt3ef2umS53bM63.PzAdUWvXHqrZUwOZLUPO0VUi7qAw.sy",
      createdAt: "2026-10-16T12:00:00.000Z"
    }
  ],

  settings: {
    siteName: "DigitalExpert",
    tagline: "Grow Your Brand. Master Digital Skills.",
    phone: "03124051296",
    whatsapp: "03124051296",
    email: "info@digitalexpert.pk",
    website: "digitalexpert.pk",
    location: "University Chowk, Bahawalpur, Pakistan",
    mapEmbedUrl: "https://maps.google.com/maps?q=University+Chowk,+Bahawalpur,+Punjab+63100,+Pakistan&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=University+Chowk+Bahawalpur&query_place_id=ChIJzQVRxcGQOzkRI6awDoZEzEQ",
    socialLinks: {
      facebook: "https://facebook.com/digitalexpertpk",
      instagram: "https://instagram.com/digitalexpertpk",
      linkedin: "https://linkedin.com/company/digitalexpertpk",
      youtube: "https://youtube.com/@digitalexpertpk",
      tiktok: ""
    },
    paymentAccounts: {
      jazzcash: {
        number: "03124051296",
        accountTitle: "Khezar Hayat"
      },
      easypaisa: {
        number: "03124051296",
        accountTitle: "Khezar Hayat"
      },
      bank: {
        bankName: "Faysal Bank",
        accountTitle: "KHIZAR HAYYAT",
        accountNumber: "3585525000006866",
        iban: "PK92FAYS3585525000006866"
      }
    },
    acceptedPaymentMethods: ["JazzCash", "EasyPaisa", "Bank transfer"],
    welcomePopup: {
      enabled: true,
      title: "Welcome to DigitalExpert!",
      message: "Bahawalpur's premier Digital Marketing Agency & Skills Training Institute."
    },
    whatsappDefaultMessage: "Hi DigitalExpert, I visited your website and would like to know more.",
    announcementBar: {
      enabled: true,
      text: "New Weekend Batch Admissions Open for Digital Marketing Courses - Limited Seats at University Chowk, Bahawalpur Campus!",
      link: "/courses"
    },
    analyticsId: "",
    facebookPixelId: "",
    defaultSeoTitle: "DigitalExpert | Digital Marketing Agency & Training Institute in Bahawalpur",
    defaultSeoDescription: "Grow your brand and master digital skills with DigitalExpert. Expert web development, SEO, paid ads, social media, and practical IT training in University Chowk, Bahawalpur."
  },

  auditLogs: [
    {
      id: "log-init",
      action: "System Initialization",
      userEmail: "system",
      timestamp: "2026-10-16T12:00:00.000Z",
      details: "Initial seed data loaded for DigitalExpert."
    }
  ],

  students: [
    {
      id: "std-demo-approved",
      name: "Ali Raza (Approved Student)",
      email: "student@digitalexpert.pk",
      phone: "03001234567",
      passwordHash: "$2a$10$/ZnUdMAt3ef2umS53bM63.PzAdUWvXHqrZUwOZLUPO0VUi7qAw.sy",
      status: "approved",
      enrolledCourses: ["wordpress", "seo"],
      requestedCourse: "wordpress",
      createdAt: "2026-10-17T12:00:00.000Z",
      approvedAt: "2026-10-17T12:30:00.000Z",
      approvedBy: "admin@digitalexpert.pk"
    },
    {
      id: "std-demo-pending",
      name: "Hamza Tariq (New Applicant)",
      email: "pending.student@gmail.com",
      phone: "03129876543",
      passwordHash: "$2a$10$/ZnUdMAt3ef2umS53bM63.PzAdUWvXHqrZUwOZLUPO0VUi7qAw.sy",
      status: "pending",
      enrolledCourses: [],
      requestedCourse: "social-media",
      createdAt: "2026-10-17T14:15:00.000Z"
    }
  ],

  lectures: [
    {
      id: "lec-wp-1",
      courseSlug: "wordpress",
      moduleTitle: "Module 1: WordPress & Hosting Architecture",
      title: "1. Localhost Setup & Domain/cPanel Configuration",
      duration: "1 hr 15 mins",
      videoUrl: "https://www.youtube.com/watch?v=8AZ8GqW5iak",
      order: 1,
      description: "Learn how to configure LocalWP on Windows, set up a MySQL database, configure production DNS records, and install SSL on cPanel.",
      assignmentPrompt: "Install LocalWP on your computer, launch a clean WordPress site, take a screenshot of your dashboard, and submit the link."
    },
    {
      id: "lec-wp-2",
      courseSlug: "wordpress",
      moduleTitle: "Module 1: WordPress & Hosting Architecture",
      title: "2. Elementor Pro Theme Builder & Header/Footer Design",
      duration: "1 hr 30 mins",
      videoUrl: "https://www.youtube.com/watch?v=0k3F788-p8k",
      order: 2,
      description: "Deep dive into Elementor Pro Theme Builder. Creating sticky glassmorphic headers, responsive mobile menus, and brutalist CTA buttons.",
      assignmentPrompt: "Design a custom responsive header and footer matching modern agency standards and submit your preview URL."
    },
    {
      id: "lec-seo-1",
      courseSlug: "seo",
      moduleTitle: "Module 1: Keyword Research & Competitive Intelligence",
      title: "1. Advanced Keyword Golden Ratio (KGR) & Search Intent",
      duration: "1 hr 10 mins",
      videoUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ",
      order: 1,
      description: "Finding low-competition, high-converting buyer intent keywords using Ahrefs, SEMrush, and free Google autosuggest frameworks.",
      assignmentPrompt: "Find 10 KGR-compliant keywords for a Bahawalpur local business niche and share your spreadsheet link."
    }
  ],

  studentAssignments: [
    {
      id: "asg-sample-1",
      studentId: "std-demo-approved",
      studentName: "Ali Raza (Approved Student)",
      studentEmail: "student@digitalexpert.pk",
      courseSlug: "wordpress",
      lectureId: "lec-wp-1",
      lectureTitle: "1. Localhost Setup & Domain/cPanel Configuration",
      submissionText: "Completed LocalWP installation and connected my domain DNS records.",
      submissionUrl: "https://github.com/aliraza/my-wp-site",
      submittedAt: "2026-10-17T13:00:00.000Z",
      grade: "A+",
      feedback: "Excellent setup! Local development environment is verified."
    }
  ]
};
