+++
categories = []
tags = []
slug = ""
title = "Raspberry Pi Zero Cluster Storage"
date = "2018-11-23T23:22:29-08:00"
draft = false

+++

# Physical Build
The physical considerations of the project must meet needs of future-proofing, cost, and setup time requirements. The aim of such a project would be to achieve:

 - Reliable, RAID-like cloud storage and computing
 - Cheap storage
 - Expandability
 - Intelligent software design

## Cluster Hat

The Cluster Hat is a deivce that connects multiple Raspberry Pi's together rather simply and gracefully. It connects and powers the Zero's mini USB port, and evern includes a software bundle. They have a website too, at [clusterhat.com](https://clusterhat.com/)

| Part                     | Needed | Cost    | Link                                                                             |
| ------------------------ | ------ | ------- | -------------------------------------------------------------------------------- |
| Raspberry Pi Zero 1.3    | 4      | $5.00   | [Adafruit](https://www.adafruit.com/product/2885)                                |
| Raspbperry Pi 2 B        | 1      | $34.95  | [PiShop](https://www.pishop.us/product/raspberry-pi-2-model-b-armv7-with-1g-ram) |
| Cluster Hat v2.0         | 1      | $34.95  | [PiShop](https://www.pishop.us/product/cluster-hat-v2-0/)                        |
| 32 GB SD cards           | 5      | $5.99   | [Amazon](https://www.amazon.com/dp/B06XWN9Q99/)                                  |

It's also helpful to break down a couple of totals, to see how the project will affect our wallet... Luckily, this isn't a project that requires too many parts. In my case, I already had a couple SD cards and Pi's lying around. So I've broken the cost down accordingly.

| Total with B | Total without B & SD | Total for minimal |
| ------------ | -------------------- | ----------------- |
| $119.85      | $78.91               | $45.95            |

A bonus to this design direction is that the Pi's require no physical modification.

## Bad USB

This device comes from [banggood.com](https://www.banggood.com/BadUSB-Zero-Quick-Plug-For-Raspberry-Pi-Zero-v1_3-Zero-W-p-1305226.html), and looks to be a very small DIY USB solder kit to give a Zero USB power and ethernet ability without much other hardware. Naturally then, a USB hub is needed to connect the Pi's to a distributor and power. Due to the orientation of the USB and the Zero boards, a [hub like this is required](https://www.amazon.com/USB-Hub-Charging-Individual-Switches/dp/B00VK9C24M/). A bonus to a setup like this (currently ignoring bandwidth across the hub and to boards still), is that the hub can be readily replaced for more Pi's, and the Pi's themselves can be used for other, BadUSB related projects.

| Ports | Price  | Price per Port | Link                                                                         |
| ----- | ------ | -------------- | ---------------------------------------------------------------------------- |
| 4     | $18.99 | $4.75          | [Amazon](https://www.amazon.com/USB-Hub-Charging-Individual-Switches/dp/B00VK9C24M/)   |
| 5     | $22.99 | $4.60          | [Amazon](https://www.amazon.com/Anker-5-Port-Charger-PowerPort-iPhone/dp/B00VH8ZW02/)  |
| 10    | $39.99 | $4.00          | [Amazon](https://www.amazon.com/AmazonBasics-USB-10-Port-Power-Adapter/dp/B076YN6CSG/) |

If we continue this approximation, and gather that each additional Pi, a micro SD card, and a corresponding USB port slot will cost a total of $16.99. The entry point for this, however, costs $48.99, for the 10 Port hub and a single Zero and SD card. At capacity, the cluster would cost $169.90, but still lacks a distributor and may be bottlenecked over the  USB hub.

This design may also integrate with the Zerotier Edge better, as it may reduce complexity when adding nodes if an Edge is used as a gateway.

## Comparison

|             | Price of Pi's (Max) | Price of Pi's (Min) | Cost per GB (Max) |
| ----------- | ------------------- | ------------------- | ----------------- |
| Cluster Hat | $78.91              | $45.95              | $0.617            |
| Bad BadUSB  | $169.90             | $48.99              | $0.531            |

Where Cost per Gb doesn't include extra overhead. For extra reference, Dropbox will currently charge $8.25/mo for 1TB of data storage. That equates to $0.097 per GB a year. Thus, a raspberry pi solution would pay off in 5.49 to 6.38 years.

This comparison also relies on using 32GB SD cards, which can easily be upgraded without heavy modification to the system.

# Digital Solutions
Current considerations and ideas  

 - Drive encryption
 - OS
 - Policies
   - Keep at least 3 copies of a file across nodes
 - Services
   - Plex
   - Git / Gitlab
   - Node creation
   - Password / account management

<!-- ## Additional Considerations
 - Power supply -->
