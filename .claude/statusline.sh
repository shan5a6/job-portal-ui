#!/usr/bin/env bash

input=$(cat)

model=$(echo "$input" | jq -r '.model.display_name // "Claude"')
used_pct=$(echo "$input" | jq -r '.context_window.used_percentage // empty')

if [ -n "$used_pct" ]; then
  filled=$(echo "$used_pct" | awk '{v=int($1/10+0.5); if(v>10) v=10; if(v<0) v=0; print v}')
  empty=$((10 - filled))
  bar=""
  for i in $(seq 1 "$filled"); do bar="${bar}▓"; done
  for i in $(seq 1 "$empty"); do bar="${bar}░"; done
  pct_str=$(printf "%.0f%%" "$used_pct")
  printf "\033[1;36m%s\033[0m \033[33m[%s]\033[0m \033[1m%s\033[0m" "$model" "$bar" "$pct_str"
else
  printf "\033[1;36m%s\033[0m \033[2mno context data yet\033[0m" "$model"
fi
