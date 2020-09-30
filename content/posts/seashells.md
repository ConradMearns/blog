+++
date = "2018-08-01T16:17:00Z"
draft = false
categories = []
tags = []
slug = ""
title = "Mathematical Seashells"

+++

In [Seashells: The Plainness and Beauty of their Mathematical Description](http://www.mat.uc.pt/~picado/conchas/eng/article.pdf), Jorge Picado describes the mathematics necessary to simulate the shape of a multitude of different seashells. In this post, I wanted to share some renders I created while implementing Picado's math into [SciView](https://github.com/scenerygraphics/sciview) and how the fourteen parameters function.

## Defining the Spiral
The parameters `D`, `A`, `alpha` and `beta` allow us to construct any variety of spiral we want.

`D` specifies the chirality of the seashell - which direction it spirals.
{{< figure src="D1A50alpha85beta10.png" caption="Counterclockwise (D = 1)" >}}
{{< figure src="D-1A50alpha85beta10.png" caption="Clockwise (D = -1)" >}}

`A` determines how far the beginning of the spiral is from the center of rotation, although it also manifests itself into determining how the diameter changes in size. It's hard to see, but here is the same shell as above, with a smaller `A` value.
{{< figure src="D1A10alpha85beta10.png" caption="(A = 10)" >}}

`alpha` is thankfully (a little) more straightforward. This value is the angle between a line drawn from the center of the spiral to any point on the surface, and the tangent at the point on the surface. In other words, it specifies the rate of spiraling.
{{< figure src="alpha85.png" caption="(alpha = 85 degrees)" >}}
{{< figure src="alpha80.png" caption="(alpha = 80 degrees)" >}}
{{< figure src="alpha70.png" caption="(alpha = 70 degrees)" >}}
This means that an angle of 90 degrees should create a circle (or a torus for this example)
{{< figure src="alpha90.png" caption="(alpha = 90 degrees)" >}}

`beta` is even more simple than `alpha`. `beta` is the angle between the axis of rotation and the edge of the generating spiral. Here is the same spiral, but with varrying values of `beta`.

{{< figure src="beta5.png" caption="(beta = 5 degrees)" >}}
{{< figure src="beta10.png" caption="(beta = 10 degrees)" >}}
{{< figure src="beta20.png" caption="(beta = 20 degrees)" >}}

## Making Shells
The above spirals, while still shells, are very thin on purpose. However, while they show the underlying spiral simply, they can't represent most seashells on their own. To do this, we must introduce an ellipse that will fill the space. This generating curve can be any shape, but for now it remains an ellipse.

Defining the ellipse is done with two new variables `a` and `b` - the radii of the ellipse.
{{< figure src="shell1.png" caption="(a = 15 | b = 15)" >}}

Now that's a seashell! What happens when `a` and `b` change though?
{{< figure src="shell2.png" caption="(a = 5 | b = 15)" >}}
{{< figure src="shell3.png" caption="(a = 15 | b = 5)" >}}

Yea the last one looks messed up, but the first one looks like it could pass as a real shell!

## Bonus Shell
At this point I surrender myself to the hour, and finish this post for now. In the meantime, here's something cool to look at.

{{< figure src="neat.png" caption="(only Gabbar Singh knows what the parameters were now)" >}}
