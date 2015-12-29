#!/bin/bash

# ----
# Text Colors and Messaging Functions

textReset=$(tput sgr0)
textRed=$(tput setaf 1)
textGreen=$(tput setaf 2)
textYellow=$(tput setaf 3)

message_info () {
  echo "$textGreen[project]$textReset $1"
}
message_warn () {
  echo "$textYellow[project]$textReset $1"
}
message_error () {
  echo "$textRed[project]$textReset $1"
}

# ----
# Help Output

show_help () {
  echo ""
  message_info "This script performs the necessary command-line operations for this app."
  message_info ""
  message_info "The following options are available:"
  message_info ""
  message_info "    -c (--clean): Removes generated directories and content. Combine with -i."
  message_info "    -h (--help): Displays this help message."
  message_info "    -i (--init): Runs all operations necessary for initialization."
  message_info "    -p (--plugins): (Re)Installs all plugins."
  message_info "    -u (--update): Update platform codebase, runs 'phonegap prepare'."
  echo ""
}

# ----
# Script Option Parsing

init=0;
merge=0;
plugins=0;
icons=0;
clean=0;
update=0;

while :; do
  case $1 in
    -h | --help | -\?)
      show_help
      exit 0
      ;;
    -i | --init)
      init=1
      ;;
    -m | --merge)
      merge=1
      ;;
    -p | --plugins)
      plugins=1
      ;;
    -n | --icons)
      icons=1
      ;;
    -c | --clean)
      clean=1
      ;;
    -u | --update)
      update=1
      ;;
    --) # End of all options
      break
      ;;
    -*)
      echo ""
      message_error "WARN: Unknown option (ignored): $1"
      show_help
      exit 1
      ;;
    *)  # no more options. Stop while loop
      break
      ;;
  esac
  shift
done

if [[ $merge = 0 ]] && [[ $plugins = 0 ]] && [[ $icons = 0 ]] && [[ $clean = 0 ]] && [[ $update = 0 ]] ; then
  # If no options specified then we're doing initialization.
  init=1
fi

# ----
# Clean

if [[ $clean = 1 ]] ; then
  if [[ -d "plugins" ]] ; then
    message_info "Removing 'plugins' directory."
    rm -rf plugins
  fi

  if [[ -d "platforms" ]] ; then
    message_info "Removing 'platforms' directory."
    rm -rf platforms
  fi
fi

if [[ $merge = 0 ]] && [[ $plugins = 0 ]] && [[ $icons = 0 ]] && [[ $init = 0 ]] && [[ $update = 0 ]] ; then
  exit 0
fi

# ----
# Make sure necessary directories exist, regardless of options.

if [[ ! -d "plugins" ]] ; then
  message_info "Creating 'plugins' directory."
  mkdir plugins
fi

if [[ ! -d "platforms" ]] ; then
  message_info "Creating 'platforms' directory."
  mkdir platforms
fi

# ----
# Add platforms

if [[ $init = 1 ]] ; then
  # TODO Check if platforms have already been added
  # 'phonegap platforms'

  message_info "Adding Android platform..."
  phonegap platform add android

  message_info "Adding iOS platform..."
  phonegap platform add ios
fi

# ----
# Add Plugins

if [[ $init = 1 ]] || [[ $plugins = 1 ]] ; then
  message_info "Adding Device Plugin..."
  phonegap plugin add cordova-plugin-device

  message_info "Adding Dialogs Plugin..."
  phonegap plugin add cordova-plugin-dialogs

  message_info "Adding Vibration Plugin..."
  phonegap plugin add cordova-plugin-vibration

  message_info "Adding Network Information Plugin..."
  phonegap plugin add org.apache.cordova.network-information

  message_info "Adding Push Plugin..."
  phonegap plugin add https://github.com/KinveyApps/phonegap-plugin-push.git
fi
