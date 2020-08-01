# Portfolio

Personal projects and interests.

## Sub-module layout

This project is a sub-module of a parent repository that contains dependency resolution files like NPM's `package.json` and Go's `go.mod`, some build tasks in a `Makefile`, and potentially necessary shared code among many other projects.
It adds some complexity but helps me maintain several similar projects more efficiently.
To setup the necessary structure:
```bash
git clone git@gitlab.com:mobius_k/mobius_k.git
cd mobius_k
git submodule update --init portfolio
```
