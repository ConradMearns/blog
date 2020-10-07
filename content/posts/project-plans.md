+++ 
draft = true
date = "2020-10-05T08:54:00"
title = "Project Plans"
slug = "" 
tags = []
categories = []
+++

As briefly described in my previous post, I need to get my projects organized. This page 'might' be a living page and get updated as needed.

(Or, I may simply copy and paste it whenever I make changes. I'm not sure which yet.)


I know that I'm missing some items here, but my objective is just to get these posted so that I can visualize and identify what I would like to do first.

# In Progress

- Hosting p5js Demos
  - Hosting for simulation "paper"

- Calendar/ToDo/scheduler
  - I want a scheduling system that I can directly control the invasiveness of.
  - Calendar events are defined via their behavior/interaction with queries.
    - How many tasks blocks are available today?
    - When will I be able to work on task X next? (If Task X takes Y task blocks to complete on avg)
    - What is the most common 'overhead' or context-switch time required for a given task?

# Needing Definitions and Deadlines

- Speech to Text for audio notes that isn't controlled by AWS

- Replacement for Hugo
  - I really like writing documents as nested lists. Attempting to balance Markdown, YAML, and Hugo-ism within a writing style that works best for me is tedious and pointless. I should make own renderer that consumes nested lists and outputs HTML
    - Cf https://svelte-zengarden.netlify.app/
  - Instead of organizing my text ()

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


Provide a fix for
```
warning: ignoring the user-specified setting 'experimental-features', because it is a restricted setting and you are not a trusted user
```

