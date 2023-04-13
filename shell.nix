with import <nixpkgs> { };

stdenv.mkDerivation {
  name = "node";
  buildInputs = [
    nodejs
    openssl
  ];
  shellHook = ''
    export PATH="$PWD/node_modules/.bin/:$PATH"
  '';
}
