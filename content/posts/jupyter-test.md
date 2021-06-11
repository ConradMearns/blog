+++ 
draft = false
title = "Jupyter Test"
date = "2021-06-10T00:00:00-00:00"
slug = "" 
+++

This is just a test for using Jupyter Notebooks as an inbetween format for working and blogging at the same time. I'd really like to write notes continuously, but I'd also like to be working. If I work within a Git project, I start to lose the ability to easily write about what I'm doing.

Even if I can't fully describe my code, I can at least break it into smaller pieces. Each cell can represent changes.


```Racket
(print "hello!")
```

    "hello!"


```Racket
(define x 3)
x
```




<code>3</code>



I have already forgetten Racket haha... how do I define a function


```Racket
(define (f y) (+ x y))
(f 7)
```




<code>10</code>



I've made a function, but I don't like the behavior. Instead of editting the cell, I can continue the story and overwrite the definition.


```Racket
(define (f y) (modulo (+ x y) y))
(f 7)
```




<code>3</code>



Assuming I can export this to Hugo easily, then I can work without as much fear of forgetting my work... I just need to be able to see everything in front of me - without that, I see nothing and do nothing.


