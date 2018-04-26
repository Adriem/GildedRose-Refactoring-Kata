class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;

const updateQualityStrategies = {
  'Sulfuras, Hand of Ragnaros': item => item.quality,
  'Aged Brie': item => {
    if (item.quality >= MAX_QUALITY) return MAX_QUALITY;
    if (item.sellIn < 0) return item.quality + 2;
    return item.quality + 1;
  },
  'Backstage passes to a TAFKAL80ETC concert': item => {
    if (item.sellIn < 0) return 0;
    if (item.quality >= MAX_QUALITY) return MAX_QUALITY;
    if (item.sellIn < 6) return Math.min(item.quality + 3, MAX_QUALITY);
    if (item.sellIn < 11) return Math.min(item.quality + 2, MAX_QUALITY);
    return item.quality + 1;
  },
  _: item => {
    if (item.quality <= 0) return 0;
    if (item.sellIn < 0) return Math.max(item.quality - 2, 0);
    return Math.max(item.quality - 1, 0)
  }
}

const updateSellInStrategies = {
  'Sulfuras, Hand of Ragnaros': item => item.sellIn,
  _: item => item.sellIn - 1
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.updateItemQuality(items[i]);
      this.updateItemSellIn(items[i]);
    }

    return this.items;
  }

  updateItemQuality(item) {
    let strategy = updateQualityStrategies[item.name];
    let defaultStrategy = updateQualityStrategies._;

    item.quality = (strategy || defaultStrategy)(item);
  }

  updateItemSellIn(item) {
    let strategy = updateSellInStrategies[item.name];
    let defaultStrategy = updateSellInStrategies._;

    item.sellIn = (strategy || defaultStrategy)(item);
  }
}
