/**
 * データと型の一元管理。
 * 将来的に Excel から読み込む場合は、ここに取り込みロジックを実装。
 */

export type Category = {
  id: string;
  name: string;
  icon?: string;     // 絵文字 or 画像URL
  themeColor?: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  cost?: number;
  allergy?: string[];   // ["小麦", "乳"] など
  imageUrl?: string;
  themeColor?: string;
  description?: string;
};

export type DataSet = {
  categories: Category[];
  products: Product[];
};

/** ひな型データ（ここを書き換えれば UI に即反映） */
export const categories: Category[] = [
  { id: "Burger", name: "バーガー",    icon: "🍔" },
  { id: "RiceBurger", name: "ライスバーガー",    icon: "🍔" },
  { id: "drink",  name: "ドリンク", icon: "🥤" },
  { id: "side",    name: "サイド",  icon: "🍟" },
];

export const products: Product[] = [
  { id: "1", categoryId: "set",    name: "Aセット",   price: 1500, cost: 200, allergy: ["小麦","乳"] },
  { id: "2", categoryId: "set",    name: "Bセット", price: 1600, cost: 250, allergy: ["小麦","乳"] },
  { id: "3", categoryId: "side", name: "ポテト",         price: 300, cost: 80  },
  { id: "4", categoryId: "drink",  name: "ドリンク",       price: 200, cost: 50  },
  { id: "5", categoryId: "Burger", name: "ハンバーガー",         price: 300, cost: 80 , allergy: ["小麦","乳"] },
  { id: "6", categoryId: "Burger",  name: "チーズバーガー",       price: 200, cost: 50 , allergy: ["小麦","乳"]},
  { id: "7", categoryId: "RiceBurger", name: "ライスバーガー",         price: 300, cost: 80 , allergy: ["小麦","乳"] },
  { id: "8", categoryId: "RiceBurger",  name: "ライスチーズバーガー",       price: 200, cost: 50 , allergy: ["小麦","乳"]},
];

/** 補助関数 */
export const productsByCategory = (catId: string) =>
  products.filter(p => p.categoryId === catId);

/**
 * 将来の Excel ローダ（XLSX -> DataSet）
 * - 実装時は `npm i xlsx` して、ArrayBuffer を parse
 * - 列例: categoryId, name, price, cost, allergy(カンマ区切り), imageUrl, themeColor, description
 */
export async function loadFromXlsx(_wb: ArrayBuffer): Promise<DataSet> {
  // import("xlsx") を使って実装予定。
  // 例:
  // const XLSX = await import("xlsx");
  // const wb = XLSX.read(_wb, { type: "array" });
  // const sheet = wb.Sheets[wb.SheetNames[0]];
  // const rows = XLSX.utils.sheet_to_json<any>(sheet, { defval: "" });
  // const categories: Category[] = ...
  // const products: Product[] = ...
  // return { categories, products };
  throw new Error("XLSX loader is not implemented yet.");
}
