"""
This tool is used to parse the page of https://www.tyrereviews.com/Tyre/#Premium.
Then get the name of all kinds of tyres.
Execute : python D:\workspace\tire-demo\scripts\parse_brands.py
"""

import xml.etree.ElementTree as ET

"""
<root>
                            <div class="col-sm-4">
                                <h3>
                                    <a href="/Tyre/Avon/">Avon</a>
                                </h3>
                                <ul class="list">
                                    <li>
                                        <a href="/Tyre/Avon/AX7.htm">AX7</a>
                                        (13)
                                    </li>
                                    <li>
                                        <a href="/Tyre/Avon/Spirit-ST.htm">Spirit ST</a>
                                        (12)
                                    </li>
                                    <li>
                                        <a href="/Tyre/Avon/WV7.htm">WV7</a>
                                        (14)
                                    </li>
                                    <li>
                                        <a href="/Tyre/Avon/ZX7.htm">ZX7</a>
                                        (41)
                                    </li>
                                    <li>
                                        <a href="/Tyre/Avon/ZV7.htm">ZV7</a>
                                        (119)
                                    </li>
                                    <li>
                                        <b>
                                            <a href="/Tyre/Avon/">All Avon tyres</a>
                                        </b>
                                    </li>
                                </ul>
                            </div>
"""
def getMidRangeBrands():
    tree = ET.parse('d:\mid-range.html')
    root = tree.getroot()

    midRangeBrands = []
    id = 2001
    for h3 in root.iter('h3'):
        brand = h3.find("a").text
        print("INSERT INTO brands (id, brand, grade) VALUES('{}', '{}', 2);".format(id, brand))
        id += 1

def getEconomyBrands():
    tree = ET.parse('d:\economy.html')
    root = tree.getroot()

    midRangeBrands = []
    id = 3001
    for h3 in root.iter('h3'):
        brand = h3.find("a").text
        print("INSERT INTO brands (id, brand, grade) VALUES('{}', '{}', 3);".format(id, brand))
        id += 1

def getBudgetBrands():
    tree = ET.parse('d:\Budget.html')
    root = tree.getroot()

    midRangeBrands = []
    id = 6001
    for h3 in root.iter('h3'):
        brand = h3.find("a").text
        print("INSERT INTO brands (id, brand, grade) VALUES('{}', '{}', 4);".format(id, brand))
        id += 1

    
def main():
    # getMidRangeBrands()
    # getEconomyBrands()
    getBudgetBrands()

if __name__ == "__main__":
    main()

