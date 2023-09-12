with import <nixpkgs> { };

stdenv.mkDerivation {
  name = "node";
  buildInputs = [
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
