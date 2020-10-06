+++ 
draft = true
date = "2020-10-05T00:00:00-00:00"
title = "Project Plans"
slug = "" 
tags = []
categories = []
+++

As briefly described in my previous post, I need to get my projects organized. This page 'might' be a living page and get updated as needed.

(Or, I may simply copy and paste it whenever I make changes. I'm not sure which yet.)


I know that I'm missing some items here, but my objective is just to get these posted so that I can visualize and identify what I would like to do first.


# Needing Definitions and Deadlines

- PWA Calendar/ToDo/scheduler
  - I want a scheduling system that I can directly control the invasiveness of.
  - I want to be able to "rank" todo items and ideas based on apparent "hotness" - which may require NLP techniques to calculate.
  - I want to programmatically generate events and schedules.
    - "Every tuesday @ 3am"
    - "MWF at 10:20am"
    - "Add a task block to do X" -> I use task blocks of 20 minutes. This should add the task to my next available block.
      - This should also connect to various tracking systems I can build (ahem, I and I alone want control over the invasiveness!) like an eye-tracker, Web browser watcher, etc.
      - A goal is to determine the average time it takes to switch contexts, and to attempt to measure my ability to coerce myself into a 'flow' state.
- I want an overview of tasks for the day, for the week, for the month, and for the year (based on some filtering.)
- PWA "Personal Twitter"
  - I'm calling it a "personal Twitter" because the ultimate goal is to replicate the input format of Twitter (but wth no character limit).
    - I should be able to input images, videos, text, and audio from any device at any time. Then I can build from there.
  - You may notice that I really like nested lists. This is possibly because I am a freak, or a Computer Scientist, or both.
  - Following the philosophy of Zettlekasten, note networks, Roam, Obsidian, Memex, etc - ideas are stored as atomic (as possible) and linked together as needed.
  - The basic premise of this structure is that every sentence has some "relation" attribute in respect to sentences surrounding it.
  - Sentences below this one can optionally rely on the context provided by this one - natural language is context sensitive!
  - Every piece of information I generate should be stored and accessible here (via VLAN only, no internet >:|) - so that I can more easily share content I care about with people I care about.
- Experimenting with NLP and graph databases for context graphing
  - Related to the "Personal Twitter" - once I have a document store of notes (which will be linked with edges that represent time/space locality) then I can do other types of analysis, such as k-means based on theme and rheme.
- Hosting p5js Demos
  - Hosting for simulation "paper"
- Personal Argumentation system
  - per sentence "tokens"
  - structured in-text list
  - prioritize questions for answers and questions
  - hypothesis / argument strength
- p5js gutter demonstration
- Tempesting mechanism for standard projects (nixfiles and pandoc)
- Experiments with Racket
  - Can I implement my own "svelte binding" operator?
    - Can I make this operator work on a distributed system?
    - Can I make this operator work in memory and with IO? Embedded?
- Finish building my ESP32 based keyboard
- Create / finish my pomodoro wrist alarm
- Experiment with a system for behavior based programming as an overlay to Git
  - Code behavior is added through a separate "language" which allows the programmer to create branches with code.
  - These branches can be added/subtracted with no merge conflicts to create the "main" branch.
- Experiment text-to-memory programming systems
  - Parallel programming by creating reactive DAG's and interdependence networks.
  - Tasks are determine, optimized for cache based execution and network traffic, and distributed
- Experiment with neural-network based measurement systems for analyzing snail shell morphologies 
- Start a series of reviewing open source projects in a Twicth stream (Like with the Linux Programming Interface book perhaps?)

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

