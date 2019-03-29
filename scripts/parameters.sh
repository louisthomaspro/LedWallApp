#!/usr/bin/env bash


export LEDWALLAPP_HOME='/home/louis/Public/LedWallApp2'
PARAMETERS=1


TITLE='\033[1;35m'
INFO='\033[0;36m'
ERROR='\033[1;31m'
SUCCESS='\033[1;32m'
NC='\033[0m' # No Color

msg_err() {
   printf "${ERROR}Script failed\n"; exit 0
}
msg_title() {
    printf "${TITLE}*** $1 ***\n${NC}"
}
msg_info() {
    printf "$1\n${NC}"
}
msg_finish() {
    printf "${SUCCESS}*** $1 ***\n${NC}"
}
