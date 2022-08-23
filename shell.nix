# nix-env -if https://github.com/DavHau/mach-nix/tarball/3.3.0 -A mach-nix
# mach-nix env ./env -r requirements.txt
# libagg-dev
# libpotrace-dev

let 
  pkgs = import <nixpkgs> {};

in

pkgs.mkShell {
  name = "env";
  buildInputs = with pkgs; [
    hugo
    python38
    python38Packages.pip
    python38Packages.bash_kernel
    python38Packages.numpy
    python38Packages.pandas
    python38Packages.matplotlib
    python38Packages.fuzzywuzzy
    python38Packages.python-Levenshtein
    poetry
    racket
    jupyter
    zeromq
  
  ];
  
  installPhase = ''
    python3 -m bash_kernel.install
    
    raco pkg install iracket
    raco iracket install
    raco pkg install racket-langserver

    # pip install git+https://github.com/bsdz/remarkable-layers.git#master
  '';

  shellHook = 
    ''
    # Make sure zeromq is setup for Racket in Jupyter
    export LD_LIBRARY_PATH=${pkgs.zeromq}/lib/

    # clear
    echo 'Welcome back! Here are your drafts:'
    echo '-----------------------------------'
    hugo list drafts
    ''
  ;
}
