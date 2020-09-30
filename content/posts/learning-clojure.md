+++
slug = ""
title = "Learning Clojure"
date = "2018-05-05T00:00:00Z"
draft = true
categories = []
tags = []

+++

So the other day I was introduced to Clojure, a LISP based language that runs off of the Java Virtual Machine. The syntax was very strange looking to me, as I've only worked with languages like C and Java, and I couldn't think of a viable way of utilizing this tool. A quick browse through Wikipedia and the power of Clojure became a bit more apparent. Not only is this tool powerful, it's not as uncommon as one may think.

## Who uses Clojure?
A peak at [Clojure's Success Stories](https://clojure.org/community/success_stories) reveals that the environment for Clojure development is actaully quite large. Walmart uses Clojure for database management, other's such as Beanstalk (a Git/SVN Host) have switched to use Clojure in order to speed up parts of their application.

## Why Clojure?








I've recently come to discover Clojure.

At this point in time I had never used a functional programming language and deliberately stayed away from Haskell and Lisp.

Closure programs have a strange syntax. The C-like statement

```c
1 + 2 * 3
```
is written as this in Clojure:

```clojure
(+ 1 (* 2 3))
```

Naturally this brought me to [clojure.org](https://clojure.org), a very industry-like face. I realized why these specialized tools needed to exist, and why you cant "Python your way through everything" forever

It was also a bit of a shock to see that it was used by Walmart, Funding Circle, Puppet (Wikipedia)

## Coffee Game
I started playing in REPL. I started by defining a new symbol to equal some random integer

```clojure
(def win (rand-int 100))
```

Then I defined the function that allows me to "play." In order to make a guess, I have to call this function

```clojure
(defn guess
  [guess]
  (if (= guess x)
    (println "NICE WORK BOSS")
    (if (< guess x)
      (println "TOO SMALL BOSS")
      (println "TOO LARGE BOSS"))))
```

This works, but it's not very user friendly. After about 5 minutes of research into user input, I made this:

```clojure
(ns coffee.core
  (:gen-class))

(def print-banner
  ((println "    Coffee Game")
   (println "===================")
   (println "Guess a number: ")))

(defn -main
  [& args]
  (def goal (rand-int 100))
  (def guess :wrong)
  (def tries 0)
  (while (not= guess goal)
    (do
      (print-banner)
      (def guess (read-string (read-line)))
      (if (< guess goal)
        (println "TOO SMALL BOSS!"))
      (if (> guess goal)
        (println "TOO LARGE BOSS!"))
      (def tries (inc tries))))
  (print (format NICE WORK BOSS, YOU GOT THE ANSWER IN %d TRIES!" tries)))
```

Now that's a coffee game! Albeit, there's a lot more going on. Let's walk it through... The first statement is probably the oddest looking.

```clojure
(ns coffee.core
  (:gen-class))
```
