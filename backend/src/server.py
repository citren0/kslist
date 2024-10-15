
import urllib.request
import urllib
import sys
from bs4 import BeautifulSoup
import time
from flask import Flask, Response, request
import os
import json


root_url = "https://www.wholefoodsmarket.com"
store_id = "10083"
num_items = "60"
product_loop_delay = 0.1


app = Flask(__name__)

def getProducts(query, disallowed, offset):

    inspected_products = []

    params = {
        "text": query,
        "store": store_id,
        "limit": num_items,
        "offset": offset,
    }

    full_url = f"{root_url}/search?{urllib.parse.urlencode(params)}"

    contents = urllib.request.urlopen(full_url).read()

    soup = BeautifulSoup(contents, "html.parser")

    mydivs = soup.find_all("div", {"class": "w-pie--product-tile"})

    products = []

    # Iterate through products.
    for item in mydivs:

        # Parse product information and fetch product page.
        brand_list = item.find_all("span", {"data-testid": "product-tile-brand"})
        item_name_list = item.find_all("h2", {"data-testid": "product-tile-name"})
        link_list = item.find_all("a", {"data-testid": "product-tile-link"})
        image_list = item.find_all("img", {"data-testid": "product-tile-image"})

        if len(brand_list) < 1 or\
            len(item_name_list) < 1 or\
            len(link_list) < 1 or\
            len(image_list) < 1:
            # Item does not contain brand, name, and link.
            continue

        brand = brand_list[0].get_text()
        item_name = item_name_list[0].get_text()
        link = link_list[0]["href"]
        image = image_list[0]["data-src"]

        if brand + item_name in inspected_products:
            # Already looked at product. Continue.
            continue

        item_details = urllib.request.urlopen(root_url + link).read()
        item_details_html = BeautifulSoup(item_details, "html.parser")

        ingredients_div_list = item_details_html.find_all("div", {"data-testid": "tabpanel-Ingredients"})
        if len(ingredients_div_list) < 1:
            # URL was not valid or page is not normal.
            continue
        ingredients_div = ingredients_div_list[0]
        ingredients_and_allergens = ingredients_div.find_all("p")

        if len(ingredients_and_allergens) < 2:
            # Could not find ingredients and allergens for item.
            continue

        ingredients = ingredients_and_allergens[0].get_text().lower().replace("ingredients: ", "").split(", ")
        allergens = ingredients_and_allergens[1].get_text().lower().split(", ")

        # Search in ingredients for disallowed.
        allergens_positive = []
        for ingredient in ingredients:
            allergens_positive.append(any([ dis in word for dis in disallowed for word in ingredient.split(" ") ]))
        
        # Search in allergens for disallowed.
        for allergen in allergens:
            allergens_positive.append(any([ dis in word for dis in disallowed for word in allergen.split(" ") ]))

        flagged = any(allergens_positive)

        inspected_products.append(brand + item_name)

        # Invert flagged to get if the product is good.
        products.append({
            "name": brand + " - " + item_name,
            "okay": not flagged,
            "image": image,
            "link": root_url + link,
        })

        time.sleep(product_loop_delay)
    
    return products


@app.route("/get_products", methods=["GET"])
def summarize():

    if "query" not in request.args or "allergen" not in request.args or "offset" not in request.args:
        return Response(status=400)

    query = request.args.get("query")
    disallowed = request.args.getlist("allergen")
    offset = request.args.get("offset")

    products = getProducts(query, disallowed, offset)

    return Response(json.dumps({ "products": products }), status=200, mimetype="application/json")


@app.errorhandler(404) 
def not_found(e): 
  return Response("Page not found.")


if __name__ == "__main__":
    if os.environ.get("DEV") == "true":
        app.run(host="0.0.0.0", port=3000, debug=True)
    else:
        from waitress import serve
        serve(app, host="0.0.0.0", port=3000)
    
    print("Server started.")
