export default class Palette {
  colors: ColorData[];
  name: string;
  constructor(name: string, input?: ColorData[]) {
    this.colors = typeof input !== 'undefined' ? input : this.buildDefaultData();
    this.name = typeof name !== 'undefined' ? name : "";
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
    const index = this.colors.map(e => {return e.id}).indexOf(id);
    if (index !== -1) {
      this.colors[index].value = color;
    }
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

interface ColorData {
  id: string;
  name: string;
  value: string;
}
