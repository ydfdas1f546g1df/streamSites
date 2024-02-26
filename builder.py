import json

BUILD_README = True


def main():
    with open("data.json", "r") as file:
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
                file.write(f"<a href='{item['url']}' style='display: flex; align-items: center;'>"
                           f"<img src='{item['icon']}' align='left' height='16' width='16'>"
                           f"&nbsp;-&nbsp;<span>{item['name']}</span>&nbsp;-&nbsp;")
                for lang in item["languages"]:
                    file.write(f" <img src='https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/{lang}.png'/>\n")
                file.write("</a>\n")
            file.write("\n\n")
# def readme_builder(data):
#     with open("README.md", "w") as file:
#         build_readme_table_of_contents(file, data)
#         for category in data:
#             file.write(f"## {category}\n")
#             file.write(f'<div style="display: flex; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">\n')
#             for item in data[category]:
#                 item_builder(item, file)
#             file.write("</div>\n\n\n")
# 
# 
# def item_builder(item, file):
#     file.write(
#         f"<a href='{item['url']}' style='justify-self: center; height: 130px; aspect-ratio: 1/1; color: #97aabb; text-decoration: none; font-family: Arial, sans-serif;"
#         f"border-radius: 10px; display: flex; flex-direction: column; align-items: center; "
#         f"border: 5px solid #4e5b70; padding: 1rem; background: #303845;'>\n"
#     )
#     file.write(
#         f"<img src='{item['icon']}' alt='{item['name']}' style='height: 70px; width: 100%; object-fit: contain;'/>\n"
#     )
#     file.write(
#         f"<p>{item['name']}</p>\n"
#                )
#     file.write(
#         f"<div style='display: flex; justify-content: space-around;'>\n"
#     )
#     for lang in item["languages"]:
#         file.write(
#             f"<img src='https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/{lang}.png'/>\n"
#         )
#     file.write(
#         "</div>\n"
#         "</a>\n"
#     )


def build_readme_table_of_contents(file, data):
    file.write("# Table of Contents\n")
    for category in data:
        file.write(f"* [{category}](#{category})\n")
    file.write("\n")


if __name__ == "__main__":
    main()
