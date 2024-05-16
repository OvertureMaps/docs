rm -rf schema/
git clone --branch=main -n --depth=1 --filter=tree:0 https://github.com/overturemaps/schema
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
mkdir -p docs/schema/reference/ && cp -R schema/docusaurus/docs/reference/* docs/schema/reference/
mv docs/schema/reference/index.mdx docs/schema/index.mdx
sed -i 's|slug: /|slug: /schema|' docs/schema/index.mdx

echo "Removing schema repo"
rm -rf schema/
