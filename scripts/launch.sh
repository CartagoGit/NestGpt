#!/bin/bash

# Get the environment variables
source ../.env

# This script is used to launch the NestGpt and ReactGpt projects
REACT_PROJECT_PATH="../ReactGpt"
NEST_PROJECT_PATH="../NestGpt"
REACT_REPOSITORY="https://github.com/CartagoGit/ReactGpt.git"
NEST_REPOSITORY="https://github.com/CartagoGit/NestGpt.git"

echo "Launching $PROJECT launcher script"

function check_and_clone {
  local PROJECT_PATH=$1
  local REPO=$2
  if [ ! -d "$PROJECT_PATH" ]; then
    git clone $REPO $PROJECT_PATH
  fi
}

check_and_clone $NEST_PROJECT_PATH $NEST_REPOSITORY
cd $NEST_PROJECT_PATH && docker-compose up -d

check_and_clone $REACT_PROJECT_PATH $REACT_REPOSITORY
cd $REACT_PROJECT_PATH && docker-compose up -d
