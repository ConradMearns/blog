with import <nixpkgs> { };

let
  tex = (pkgs.texlive.combine {
    inherit (pkgs.texlive) scheme-full
      markdown
      xcolor
      geometry xstring
      blindtext
      # fonts/inter
      ;
  });
in
stdenv.mkDerivation {
  name = "node";
  buildInputs = [
    tex
    inotify-tools
    # texlive.combined.scheme-full
    nodejs_latest
    nodePackages.pnpm
    openssl
    bun

    # For cms-server
    python39
    python39Packages.poetry
  ];
  shellHook = ''
    export PATH="$PWD/node_modules/.bin/:$PATH"
  '';
    # cms-server
  LD_LIBRARY_PATH = lib.makeLibraryPath [ pkgs.stdenv.cc.cc ];
}
