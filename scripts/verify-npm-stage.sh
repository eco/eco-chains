#!/usr/bin/env bash
# semantic-release verifyConditions hook: fail the release early, before any
# tag or commit exists, if the npm on PATH cannot run `npm stage publish`
# (added in npm 11.15.0). The Release workflow upgrades npm for this reason.
set -euo pipefail
have="$(npm -v)"
need="11.15.0"
if [ "$(printf '%s\n%s\n' "$need" "$have" | sort -V | head -n1)" != "$need" ]; then
  echo "npm ${have} cannot run 'npm stage publish' (needs >= ${need}); run: npm install -g npm@^11.15.0" >&2
  exit 1
fi
echo "npm ${have} supports 'npm stage publish'"
