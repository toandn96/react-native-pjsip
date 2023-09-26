#!/bin/bash
set -e

VERSION="v1.0.1"
URL="https://github.com/toandn96/react-native-pjsip-builder/releases/download/${VERSION}/release.tar.gz"
LOCK=".libs.lock"
DEST=".libs.tar.gz"
DOWNLOAD=true

echo "Update android libs"
if ! type "curl" >/dev/null; then
    echo "Missed curl dependency" >&2
    exit 1
fi
if ! type "tar" >/dev/null; then
    echo "Missed tar dependency" >&2
    exit 1
fi

if [ -f ${LOCK} ]; then
    CURRENT_VERSION=$(cat ${LOCK})

    if [ "${CURRENT_VERSION}" == "${VERSION}" ]; then
        DOWNLOAD=false
    fi
fi

if [ "$DOWNLOAD" = true ]; then
    echo "Download android libs version $VERSION"
    curl -L --silent "${URL}" -o "${DEST}"
    tar -xvf "${DEST}" || true
    rm -f "${DEST}"

    echo "${VERSION}" >${LOCK}
fi
