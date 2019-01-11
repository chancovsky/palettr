export default class Palette {
  colors: ColorData[];
  constructor(input?: ColorData[]) {
    this.colors = typeof input !== 'undefined' ? this.colors = (input) : this.buildDefaultData();
  }

  buildDefaultData(): ColorData[] {
    // Max number of items in a palette
    const max = 5;
    const arr = []

    for (var i = 0; i <= max - 1; i++) {
      const item: ColorData = {
        id: this.generateGUID(),
        name: "",
        value: "#FFFFFF"
      };
      arr.push(item);
    }
    return arr;
  }

  updateColor(id: string, color: string) {
      console.log(this.colors);
      console.log('data', id);
      console.log('color', color);
      
    // const index: number = this.colors.indexOf(
    //   (e: ColorData): any => {
    //     return (e.id = id)
    //   }
    // );

    const index = this.colors.map(e => {return e.id}).indexOf(id);
    console.log(index);
    if (index !== -1) {
      this.colors[index].value = color;
    }

    console.log(this.colors);
  }

  generateGUID(): string {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c: number) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
  }
}

interface UpdateDataInterface {
  color_id: string;
  value: string;
}

interface ColorData {
  id: string;
  name: string;
  value: string;
}
