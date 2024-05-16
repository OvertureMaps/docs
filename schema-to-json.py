import json, os, yaml

for root, subdirs, files in os.walk('docs/_schema_json'):
    for file in files:
        if not os.path.isfile(os.path.join(root, file)):
            continue
        print(root, file)

        with open(root + '/' + file, 'r') as yaml_file:
            parsed = yaml.safe_load(yaml_file)

            json.dump(parsed, open(root + '/' + file.replace('.yaml', '.json'), 'w'))

# Then run: rm -r docs/_schema_json/**/*.yaml
