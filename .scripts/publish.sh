#!/bin/sh
# Publishes each of the packages to the registry

set -e

PACKAGES=$( ls ./packages/ )
VERSION=$( node -p "require('./lerna.json').version" )

# Determine npm tag based on version type
# Prerelease versions (alpha, beta, rc) need a tag
if echo "${VERSION}" | grep -qE "-(alpha|beta|rc)"; then
  # Extract the prerelease type (alpha, beta, rc)
  # Use sed compatible with both BSD (macOS) and GNU sed
  if echo "${VERSION}" | grep -qE "-alpha"; then
    PRERELEASE_TYPE="alpha"
  elif echo "${VERSION}" | grep -qE "-beta"; then
    PRERELEASE_TYPE="beta"
  elif echo "${VERSION}" | grep -qE "-rc"; then
    PRERELEASE_TYPE="rc"
  else
    PRERELEASE_TYPE="next"
  fi
  NPM_TAG="${PRERELEASE_TYPE}"
else
  # Stable versions use "latest" tag (default)
  NPM_TAG="latest"
fi

echo "\"module\",\"shasum_local\",\"shasum_remote\""
for PACKAGE in ${PACKAGES} ; do
  cd ./packages/${PACKAGE}
  PACKAGE_VERSION=$( node -p "require('./package.json').version" )
  if [ "${VERSION}" != "${PACKAGE_VERSION}" ] ; then
    echo "${PACKAGE} - expected version to be ${VERSION}, but found ${PACKAGE_VERSION}"
    exit 1
  fi
  PACKAGE_NAME=$( node -p "require('./package.json').name" )
  PACKAGE_SHA_LOCAL=$( npm pack --dry-run 2>&1 >/dev/null | grep "shasum: " | awk '{print $NF}' )
  npm publish --access public --tag "${NPM_TAG}"
  PACKAGE_SHA_REMOTE=$( npm view ${PACKAGE_NAME}@${VERSION} dist.shasum )
  echo "\"${PACKAGE_NAME}@${VERSION}\",\"${PACKAGE_SHA_LOCAL}\",\"${PACKAGE_SHA_REMOTE}\""
  if [ "${PACKAGE_SHA_LOCAL}" != "${PACKAGE_SHA_REMOTE}" ] ; then
    echo "${PACKAGE} - local shasum is ${PACKAGE_SHA_LOCAL}, but published shasum is ${PACKAGE_SHA_REMOTE}"
    exit 1
  fi
  cd ../..
done
