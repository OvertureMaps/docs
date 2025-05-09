# This script checks out the overturemaps/schema repository.
# It will pull from `main` unless SCHEMA_BRANCH is explicitly set to something else

rm -rf schema/
git clone --branch=${SCHEMA_BRANCH:-main} -n --depth=1 --filter=tree:0 https://github.com/overturemaps/schema
cd schema
git sparse-checkout set --no-cone examples schema docusaurus
git checkout
echo "Successfully checked out schema reference docs:"
du -hs .
cd ..

echo "Copying Examples"
rm -rf docs/_examples/
mkdir -p docs/_examples && cp -R schema/examples/* docs/_examples/

echo "Copying Schema YAML"
rm -rf docs/_schema
mkdir -p docs/_schema && cp -R schema/schema/* docs/_schema/

echo "Copying Schema Pages"
rm -rf docs/schema
mkdir -p docs/schema/ && cp -R schema/docs/schema/* docs/schema/

echo "Removing schema repo"
rm -rf schema/
