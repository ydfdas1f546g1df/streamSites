import json

BUILD_README = True


def main():
    with open("src/data/data.json", "r") as file:
        data = file.read()
        data = json.loads(data)
        categorys = categorise_data(data)
        categorys = sort_data_in_categorys(categorys)
        categorys = dict(sorted(categorys.items()))
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


def sort_data_in_categorys(data):
    for category in data:
        data[category].sort(key=lambda x: x["name"])
    return data


def readme_builder(data):
    with open("README.md", "w") as file:
        build_readme_table_of_contents(file, data)
        for category in data:
            file.write(f"## {category}\n")
            for item in data[category]:
                file.write(
                    f"<a href='{item['url']}' style='display: flex; align-items: center; text-decoration: none;'>\n"
                    f"<img src='{item['icon']}' align='left' height='16' width='16'>\n"
                    f"&nbsp;-&nbsp;\n<span>{item['name']}</span>\n&nbsp;-&nbsp;\n")
                for lang in item["languages"]:
                    file.write(
                        f" <img src='https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/{lang}.png'/>\n")
                file.write("</a>\n\n<br/>\n\n")
                

def build_readme_table_of_contents(file, data):
    file.write("# Table of Contents\n")
    for category in data:
        file.write(f"* [{category}](#{category})\n")
    file.write("\n")


if __name__ == "__main__":
    main()
