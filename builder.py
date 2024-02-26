import json

BUILD_README = True


def main():
    with open("data.json", "r") as file:
        data = file.read()
        data = json.loads(data)
        categorys = categorise_data(data)
        if BUILD_README:
            readme_builder(categorys)


def categorise_data(data):
    categorys = {}
    for item in data:
        category = item["category"]
        if category not in categorys:
            categorys[category] = []
        categorys[category].append(item)
    return categorys


def readme_builder(data):
    with open("README.md", "w") as file:
        build_readme_table_of_contents(file, data)
        for category in data:
            file.write(f"## {category}\n")
            for item in data[category]:
                file.write(f"* [{item['name']}]({item['url']})\n")
            file.write("\n")


def build_readme_table_of_contents(file, data):
    file.write("# Table of Contents\n")
    for category in data:
        file.write(f"* [{category}](#{category})\n")
    file.write("\n")


if __name__ == "__main__":
    main()
