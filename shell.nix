# nix-env -if https://github.com/DavHau/mach-nix/tarball/3.3.0 -A mach-nix
# mach-nix env ./env -r requirements.txt

let 
  pkgs = import <nixpkgs> {};

in

pkgs.mkShell {
  name = "env";
  buildInputs = with pkgs; [
    hugo
    python39
    poetry

    python39Packages.bash_kernel    
    python39Packages.numpy
    # python39Packages.jupytext

    racket
    jupyter
    zeromq
  
  ];
  
  # installPhase = "python -m bash_kernel.install";

  shellHook = 
    "
    # Make sure zeromq is setup for Racket in Jupyter
    export LD_LIBRARY_PATH=${pkgs.zeromq}/lib/

    python -m bash_kernel.install

    # Isn't nix great??
    raco pkg install iracket
    raco iracket install
    raco pkg install racket-langserver



    clear
    echo 'Welcome back! Here are your drafts:'
    echo '-----------------------------------'
    hugo list drafts
    "
  ;
}
