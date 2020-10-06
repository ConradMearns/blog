with import <nixpkgs> {};
stdenv.mkDerivation rec {
  name = "env";
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = [
    hugo
  ];
  shellHook = 
    "
    clear
    echo 'Welcome back! Here are your drafts:'
    echo '-----------------------------------'
    hugo list drafts
    "
  ;
}
