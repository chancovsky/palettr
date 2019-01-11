import Palette from './Palette';

export default class Collection {
  palettes: Palette[];
  constructor(input?: any) {
    this.palettes = typeof input !== 'undefined' ? this.buildData(input) : [];
  }

  buildData(data: any): Palette[] {
    const ret: Palette[] = []
    data.colorData.forEach((e: any) => {
      const item = new Palette(e.name, e.colors);
      ret.push(item);
    });
    return ret;
  }

  addCollection(name: string) {
    const newPalette = new Palette(this.generateGUID());
    this.palettes.push(newPalette);
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
