#!/bin/bash

set -e

PROJECTS=(./components ./home/web ./signer/web ./status/web ./extension)
CMD="help"

# Parse CLI
case "$1" in
  clean | c | cl | cle | clea)
    CMD="clean"
    ;;
  build | b | bu | bui | buil)
    CMD="build"
    ;;
  lint | l | li | lin)
    CMD="lint"
    ;;
  test | t | te | tes)
    CMD="test"
    ;;
  shrinkwrap)
    CMD="shrinkwrap"
    ;;
esac

shift

# Run Command
case "$CMD" in
  help)
    echo "Options: clean, shrinkwrap, build, test, help"
    ;;
  clean)
    set -x
    for P in ${PROJECTS[@]}; do
      cd $P
      rm -rf node_modules
      cd -
    done
    ;;
  build)
    set -x
    for P in ${PROJECTS[@]}; do
      cd $P
      rm -rf node_modules
      npm install --no-progress
      NODE_ENV="production" npm run build
      cd -
    done
    ;;
  lint)
    set -x
    for P in ${PROJECTS[@]}; do
      cd $P
      npm run lint
      cd -
    done
    ;;
  test)
    set -x
    for P in ${PROJECTS[@]}; do
      cd $P
      npm run test
      cd -
    done
    ;;
  shrinkwrap)
    set -x
    for P in ${PROJECTS[@]}; do
      cd $P
      npm install --no-progress
      npm prune --production=false
      npm shrinkwrap --dev
      cd -
    done
    ;;
  *)
    echo "Unknown command: $CMD"
    exit 1
    ;;
esac
