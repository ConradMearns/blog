+++ 
draft = false
date = "2021-01-11T00:00:00-00:00"
title = "Time"
slug = "" 
tags = []
categories = []
+++

There's a lot I want to talk about, but I know that I'm just creating more work for myself down the road. 

I have made a few of recordings of Quantity vs Quality and on 20/80 happiness-scheduling, but I need to start writing these things out.

Upon opening this blog, I found a a nice surprise waiting for me.

I finally got around to figuring out how NixOS aliasing works, and added an alias for `nix-shell` to `ns`.

When I opened the blog and ran `ns`, this message popped up:

```
Welcome back! Here are your drafts:
-----------------------------------
content/posts/js-test.md
content/posts/project-plans.md
content/posts/time.md
```

I had completely forgotten I did this a few months ago.

There are two small systems at play here, 1 being the alias, and the other being the Project-Specific MOTD.

Small steps lead to big improvements over time.

---

I realise now that I don't need to concern myself with building databases to syncronize application state for stuff like my Scheduler and the Constellation demo.

I have Git, and I have Bash.

Granted, I wont be able to make modifications to the data through my phone, but I probably don't need to yet.

I can make some changes to the way I have approached work, blogging, scheduling, etc.

The tricky bit to this problem is still encrypted information - there is content I want to blog about that should remain more or less hidden.

But I have ways I can solve this issue, by simply redacting the content before it's included in a Git repo.

## Blogging

I should stop calling the activity 'blogging'.

What I want to do is share my... logs... without worrying about crafting perfect stories and driving up engagement.

I jsut want to record my stream of conciousness, and let others benifit from my ideas.

I also  want to craft good stories, research, statements, etc.

I could easily start an approach to these issues, and now I know where to begin.

Scraps will still be append only - but I can easily make an application that extracts portions of text for use in mentions, rewrites, etc.

Pipeline processes can use folders to seperate types of work - and by seperating types of work by folder, I can seperate `shell.nix` files to change my working environment accordingly.

```
scraps -> rewriting -> evergreen notes (Cf Sonke How to Take Smart Notes)
introductions -> feedback collection -> outlining -> drafting -> feedback -> rewriting (Cf Julian On Writing)
citations and notes -> scraps
                    -> problem questions -> answers
                                         -> flash cards
scraps -> questions -> hypothesese -> experiments
```

These pipelines aren't built yet, because I don't know how well they'll work.

I will only know how well they work once they've been built - so it's time to start building.

---

It just sucks that I don't have a better way to include code in this yet.