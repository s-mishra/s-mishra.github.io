rm -rf public/*
hugo

cd public
git add --all
git commit -m "publish"
cd ../
git push origin gh-pages
cd ../