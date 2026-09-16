#!/usr/bin/env bash
# semantic-release success hook: tell the workflow run (and anyone reading the
# log) that the version is STAGED on npm, not published, and how to promote it.
set -euo pipefail
version="${1:?usage: stage-summary.sh <version>}"
{
  echo "### v${version} staged on npm — NOT yet published"
  echo
  echo "\`@eco-foundation/chains@${version}\` is queued on npm and is **not installable** until a"
  echo "maintainer approves it with a 2FA challenge:"
  echo
  echo '```'
  echo 'npm stage list @eco-foundation/chains'
  echo 'npm stage approve <stage-id>   # or: npm stage reject <stage-id>'
  echo '```'
  echo
  echo "The queue is also visible on npmjs.com. No CI credential can approve."
} >> "${GITHUB_STEP_SUMMARY:-/dev/stdout}"
