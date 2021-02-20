+++ 
draft = false
date = "2021-02-20T00:00:00-00:00"
title = "'Nixing' Racket with Jupyter"
slug = "" 
tags = []
categories = []
+++


Notes and commands on installing the Racket Jupyter Kernel on Nixos


```bash
nix-shell -p jupyter zeromq racket
raco pkg install iracket
raco iracket install

export LD_LIBRARY_PATH=/nix/store/w1xjxz84cy59zhijz4w18m3a6kc65lk8-zeromq-4.3.2/lib/
```



https://discourse.nixos.org/t/what-is-the-nix-way-to-specify-ld-library-path/6407/2

```bash
export LD_LIBRARY_PATH=$(nix eval --raw nixpkgs.zlib)/lib:$LD_LIBRARY_PATH
```

seems not to work anymore... Not sure why

In any case, it would be good to have a shell.nix for this.

I don't know how to correctly add raco packages, and I don't care at the moment.

```nix
{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    nativeBuildInputs = [
      pkgs.racket
      pkgs.jupyter
      pkgs.zeromq
    ];

  shellHook =
  ''
  export LD_LIBRARY_PATH=${pkgs.zeromq}/lib/
  
  raco pkg install iracket
  raco iracket install
  '';

}
```