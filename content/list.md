+++ 
draft = false
date = "2021-01-11T00:00:00-00:00"
title = "Public Listing"
slug = "" 
tags = []
categories = []
+++

> I need a list of all the things I had bene thinking of working on so that I can keep track of what I'm trying to organize.
> In a loose GTD fashion, "Things I Can Do Now" will be listed near the top

Other things are listed on project-plans...

---

- M2A2 Case

- Review Accounts
  - Student Loans
  - Spotify
  - Youtube
  - Amazon

- Department Letter
  - Transcribe audio notes
  - Collect text notes
  - Introduction / Feedback

- (Analyze) Minecraft
  - aesthetics is hard

- (Analyze) Self Review

- (Experiment) Daily Task Tracker
  - Based on James Clear journal, basic table of checkmarks and digits for Retrospective Revision Planning

- (Research) Light Based Context Guide
  - Use light (lamps and LED's) to guide attention into environments and context zones as a scheduling tool
  - A portable lamp, or torch, could be used to inform the user of the passage of time - a 20 minute torch is a portable lamp that shines for 20 minutes

- (Research) Lap Desk
  - Want to hold a drink, remarkable, book

- (Analyze) Organization
  - remarkable
  - Inbox stream
  - Twitter
    - bookmarks
    - likes
  - old obsidian notes

- (Analyze|Experiment) OSEK
  - Design and test fit backplate
  - Test Wiring
    - build pictures
  - SVG / PCB design?

- (Experiment) Constellations
  - Data structures
  - NLP Theme analysis / tagging
  - Test data preperation
  - Browsing / Thread History (Data structures / algebra)

- (Experiment) Radish Timer
  - Calendar
  - Scheduler
  - Pomotimer

- Grocery List PWA

- (Do) Study HoTT

- (Do|Analyze) Skiing
  - 1-10, 1-7, 1-5?
  - (Analyze) Cabinets
    - Ski rack
    - Pole rack
    - Boot shelf
    - Helmet shelf / hooks
    - Glove pegboard
    - snowpants
    - coats
  

- (Do) Plague Server
  - Order case, mobo, ram, drive, check PSU, CPU, GPU
  - CHANGE OF PLAN, just going to use Pi's for now

- (Research) Remarkable symbol detection

- (Research|Experiment) ProseMirror for delimetered text entry

- (Research|Experiment) Android PWA Widget

- E-Badger
  - proxy/portal into a Zerotier network

- Statement of Purpose






---

# From Project Plans

- Hosting p5js Demos
  - Hosting for simulation "paper"

- Speech to Text for audio notes that isn't controlled by AWS

- Replacement for Hugo
  - I really like writing documents as nested lists. Attempting to balance Markdown, YAML, and Hugo-ism within a writing style that works best for me is tedious and pointless. I should make own renderer that consumes nested lists and outputs HTML
    - Cf https://svelte-zengarden.netlify.app/

- PWA "Personal Twitter"
  - I'm calling it a "personal Twitter" because the ultimate goal is to replicate the input format of Twitter (but wth no character limit).
    - I should be able to input images, videos, text, and audio from any device at any time. Then I can build from there.
  - You may notice that I really like nested lists. This is possibly because I am a freak, or a Computer Scientist, or both.
  - Following the philosophy of Zettlekasten, note networks, Roam, Obsidian, Memex, etc - ideas are stored as atomic (as possible) and linked together as needed.
  - The basic premise of this structure is that every sentence has some "relation" attribute in respect to sentences surrounding it.
  - Sentences below this one can optionally rely on the context provided by this one - natural language is context sensitive!
  - Every piece of information I generate should be stored and accessible here (via VLAN/ZT only, no internet >:|) - so that I can more easily share content I care about with people I care about.

- Experimenting with NLP and graph databases for context graphing
  - Related to the "Personal Twitter" - once I have a document store of notes (which will be linked with edges that represent time/space locality) then I can do other types of analysis, such as k-means based on theme and rheme.

- Personal Argumentation system
  - per sentence "tokens"
  - structured in-text list
  - prioritize questions for answers and questions
  - hypothesis / argument strength

- p5js gutter demonstration
  - Can I make this: https://twitter.com/crabl/status/1310137426422034432
  - Is this a useful replacement for my current nesting style?

- Template mechanism for standard projects (nixfiles and pandoc)

- Experiments with Racket
  - Can I implement my own "svelte binding" operator?
    - Can I make this operator work on a distributed system?
    - Can I make this operator work in memory and with IO? Embedded?

- Finish building my ESP32 based keyboard
  - Backplate construction, hot glue or patience?
    - How to get proper SVG scaling on the Glowforge?

- Create / finish pomodoro wrist alarm

- Experiment with a system for behavior based programming as an overlay to Git
  - Code behavior is added through a separate "language" which allows the programmer to create branches with code.
  - These branches can be added/subtracted with no merge conflicts to create the "main" branch.
  - Behavior 

- Experiment text-to-memory programming systems
  - Parallel programming by creating reactive DAG's and interdependence networks.
  - Tasks are determine, optimized for cache based execution and network traffic, and distributed

- Experiment with neural-network based measurement systems for analyzing snail shell morphologies 

- Experiment with ranked topic/argument lists
  - Assign vectorized points base on questions, hypothesis, contentions, etc and use the value to map bulletins in an nD field/map
  - Blocked: I at least need a parser for structured argumentation

## Personal Operating System Tweaks
- signal some windows to "float" between all workspaces with transparency
- Disable automatic window transparency
  - Or add a feature to toggle?
    - I want to be able to take random screenshots and have the screenshot be worthy of being posted on r/unixporn
- NixOS: fix program inclusion and Homemanager for distributed configurations.
- NixOS: set up a system for easily providing services to the configuration
- Automatically pull git:main on computers when a new update is pushed
- Control when services run on remote machines (Cf p5 demo)
- Replace i3status bar with something that looks pretty
- Determine if I can optimize battery life on my laptop
- Save working applications for later
  - Fix media buttons on laptop
- Setup Direnv
- Workspace launcher
  - https://github.com/jtyers/i3-launcher
- Investigate VR Desktop with linux
  - Gesture mapping
