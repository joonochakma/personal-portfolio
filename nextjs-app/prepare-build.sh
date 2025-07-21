#!/bin/bash
cp -r public/. .next/standalone
cp -r .next/static/. .next/standalone/.next/static
cp run.sh .next/standalone/run.sh