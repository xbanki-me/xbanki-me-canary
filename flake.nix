#
# NixOS development shell.
#
# Copyright: Copyright (c) 2025 xbanki <contact@xbanki.me>
#            Licensed under MIT License.
#            See LICENSE for mode details.
# Author:    xbanki <contact@xbanki.me>
#

{
  description = "xBanki.me development shell";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { flake-utils, nixpkgs, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };

      in
      {
        devShells.default = pkgs.mkShell {
          shellHook = ''
            export BIOME_BINARY="${pkgs.biome}/bin/biome"
            corepack enable --install-directory ~/.local/bin
          '';

          name = "xbanki-me-devshell";
          buildInputs = [
            pkgs.nodePackages.eslint_d
            pkgs.nodePackages.eslint
            pkgs.nodejs_22
            pkgs.corepack
            pkgs.biome
          ];
        };
      }
    );
}
