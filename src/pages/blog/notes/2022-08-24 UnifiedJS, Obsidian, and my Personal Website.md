---
title: UnifiedJS, Obsidian, and my Personal Website
date: '2022-08-24'
layout: '@layouts/Blog.astro'
---

There's a lot a little things in Obsidian that I wish I could automate. For instance
- the [[Process of Daily Note Splitting]]
- the linking of content pages 
	- `[[Process of Daily Note Splitting]]` contains `[[Daily Note Splitting]]` which is also found in `[[2022-01-27 Testing Daily Note Splitting]]`
- text search
- wikilinks!

There's also a bunch of things I _wish_ I could do in general - like structuring [[Git Repos as Tutorials]]

When it comes to getting content from my obsidian vault and adding it to the website, I think the best path forward is to treat the vault as an external resource - either a git repo (where it lives now) or something else like S3. Assuming the repo is public, I can access each file via `https://raw.githubusercontent.com/user/repository/branch/filename`. This reminds me that there are a few more features needed though...
- replication to a new, public, Github repo
- content encryption with a sensible method for access
- How to link to people??
- In obsidian, I can embed and transclude documents, queries, and many other things that act like components...

Then, assuming I can access the files, I have the choice of when each file gets processed.
Do I process them closer to edit-in-obsidian time? or closer to fetch-and-render time?

Many of these processes I will want to have closer to edit time. The ability to auto-link related notes, the process of fetching user information for people I keep referring too, wikilink suggestions. These are processes which will directly improve the experience of using Obsidian, and so they should stay close to it.

Other processes need to happen a bit farther away - such as encryption. [[Blog Encryption]] is something I've made links for already! Though I don't see much content.

The idea behind blog encryption should be thus
- content is encrypted (IF NOT UN-INCLUDED) by default
	- how to choose?
		- start with an include-list
- encrypted content should have some sort of password to access
- content should be linkable to certain users and/or groups
	- a user, like a friend, should be able to request access to a resource and an automated process should be able to give them access
	- user access should be governed by keys. a user is able to gain access by uploading their public key
	- content is encrypted with a content-oriented key, and this content-oriented key is copied and encrypted for each user
		- content should be hashed, and keys should be generated per hash in order to ensure extra (costly) work isn't done

It would also be nice to have some better visualization tools! I want a graph mode that can help me size file sizes, link counts, wants, desires, topic count, etc.