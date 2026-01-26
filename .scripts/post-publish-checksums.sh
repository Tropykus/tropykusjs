#!/bin/sh
# Computes the checksums of all of the packages remotely (in the registry)

set -e

PACKAGES=$( ls ./packages/ )
VERSION=$( node -p "require('./package').version" )
echo "\"module\",\"shasum\""
for PACKAGE in ${PACKAGES} ; do
  PACKAGE_NAME=$( node -p "require('./packages/${PACKAGE}/package.json').name" )
  PACKAGE_SHA=$( npm view ${PACKAGE_NAME}@${VERSION} dist.shasum )
  echo "\"${PACKAGE_NAME}@${VERSION}\",\"${PACKAGE_SHA}\""
done
