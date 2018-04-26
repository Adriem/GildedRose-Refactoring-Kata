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
  'Aged Brie': item => item.quality < MAX_QUALITY ? item.quality + 1 : item.quality,
  'Backstage passes to a TAFKAL80ETC concert': item => {
    if (item.quality >= MAX_QUALITY) return MAX_QUALITY;
    if (item.sellIn < 6) return Math.min(item.quality + 3, MAX_QUALITY);
    if (item.sellIn < 11) return Math.min(item.quality + 2, MAX_QUALITY);
    return item.quality + 1;
  },
  _: item => item.quality > 0 ? item.quality - 1 : item.quality
}

class DeprecableItem extends Item {
  constructor(name, sellIn, quality, updateQualityFn) {
    super(name, sellIn, quality);
    this.updateQualityFn = updateQualityFn;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.updateItemQuality(items[i]);
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }

  updateItemQuality(item) {
    let strategy = updateQualityStrategies[item.name];
    let defaultStrategy = updateQualityStrategies._;

    item.quality = (strategy || defaultStrategy)(item);
  }
}
