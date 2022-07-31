#!/bin/bash

nx build core 
nx build from 
nx build walker 
nx build graphql 
nx build prettier 
nx build pull 
nx build code 
#nx deploy typescript --access public

CURRENT_DIR=$(pwd)
cd ./dist/packages/core
yalc publish --push

cd $CURRENT_DIR
cd ./dist/packages/from
yalc publish --push

cd $CURRENT_DIR
cd ./dist/packages/walker
yalc publish --push

cd $CURRENT_DIR
cd ./dist/packages/graphql
yalc publish --push

cd $CURRENT_DIR
cd ./dist/packages/prettier
yalc publish --push

cd $CURRENT_DIR
cd ./dist/packages/pull
yalc publish --push

cd $CURRENT_DIR
cd ./dist/packages/code
yalc publish --push
