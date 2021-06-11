#!/bin/bash
set -e

VERSION="2.9"
URL="https://nuacom-app.s3.eu-west-1.amazonaws.com/releases/mobile/pjsip/pjsip-${VERSION}.tar.gz"
LOCK=".libs.lock"
DEST="release.tar.gz"
DOWNLOAD=true

if ! type "curl" > /dev/null; then
    echo "Missed curl dependency" >&2;
    exit 1;
fi
if ! type "tar" > /dev/null; then
    echo "Missed tar dependency" >&2;
    exit 1;
fi

if [ -f ${LOCK} ]; then
    CURRENT_VERSION=$(cat ${LOCK})

    if [ "${CURRENT_VERSION}" == "${VERSION}" ];then
        DOWNLOAD=false
    fi
fi

if [ "$DOWNLOAD" = true ]; then
    curl -LO --silent "${URL}"
    tar -xvf "${DEST}"
    rm -f "${DEST}"

    echo "${VERSION}" > ${LOCK}
fi
