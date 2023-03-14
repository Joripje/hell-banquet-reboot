import csv
import json

with open('data.json', 'rt', encoding='UTF8') as f:
    menus = json.load(f)

menu_list = {}  # 메뉴 별 나온 횟수 저장

for key, value in menus.items():    # key: 날짜, value: A/B 식단
    for menu_type, foods in value.items():  # menu_type: A or B, foods: 음식 리스트
        for food in foods:
            if menu_list.get(food):
                menu_list[food] += 1
            else:
                menu_list[food] = 1

# 메뉴 별 나온 횟수를 json 파일로 저장
with open('menu_stats.json', 'w', encoding="UTF-8") as make_file:
    json.dump(menu_list, make_file, ensure_ascii=False, indent="\t")

# menu_stats.json 파일을 csv 파일로 저장
with open("food_cnt.csv", mode="w", newline='') as csvfile:
    # create a writer object
    writer = csv.writer(csvfile)

    # write the header row
    writer.writerow(["food", "count"])

    # write the data rows
    for key, value in menu_list.items():
        writer.writerow([key, value])