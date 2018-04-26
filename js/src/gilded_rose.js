class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const updateQualityStrategies = {
  'Sulfuras, Hand of Ragnaros': item => item.quality,
  'Aged Brie': (item) => item.quality + 1,
  // 'Backstage passes to a TAFKAL80ETC concert': (item) => item.quality + 1,
  // _: (item) => item.quality - 1
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
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      item.quality = updateQualityStrategies[item.name](item);
    } else if (item.name === 'Aged Brie' || item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    } else {
      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
    }
  }
}
