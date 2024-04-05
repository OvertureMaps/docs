rm -rf schema/
git clone --branch=dev -n --depth=1 --filter=tree:0 https://github.com/overturemaps/schema
cd schema
git sparse-checkout set --no-cone docusaurus examples schema
git checkout
echo "Successfully checked out schema reference docs:"
du -hs .
cd ..

# Now copy the relevant schema files into the docs here
rm -rf docs/_schema/
rm -rf docs/_examples/
rm -rf docs/reference/
mkdir -p docs/_schema && cp -R schema/schema/* docs/_schema/
mkdir -p docs/_examples && cp -R schema/examples/* docs/_examples/
cp -R schema/docusaurus/docs/reference docs/

# Copy important pieces
cp schema/docusaurus/src/YAML_FILE_TREE.js src/

rm -rf schema/
