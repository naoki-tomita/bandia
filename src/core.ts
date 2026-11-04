const chars = "abcdefghijklmnopqrstuvwxyz";
function random(count: number) {
  return Array(count).fill(null).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export type AnyFunction = (...args: any[]) => any;

export type FunctionExcluded<T> = { [key in keyof T]?: T[key] extends AnyFunction ? never : T[key] };

/**
 * Kotlin の mockk のように、型を渡すだけで「どのプロパティにアクセスしてもモック関数が返る」
 * オブジェクトを作る。
 * 実体はほぼ空のオブジェクトで、Proxy の get トラップでアクセスされたキーに応じて値を返す。
 * モック関数の生成はテストランナー（jest / vitest）ごとのエントリから `createFn` として渡される。
 */
export function createMock(createFn: () => AnyFunction, overrideProps?: { [key: string]: unknown }): any {
  // キーごとに生成したモック関数のキャッシュ
  const fns: { [key: string]: AnyFunction } = {};
  // モックごとの識別子。異なるモック同士を見分けるために使う
  const id = random(5);
  // target に __id__ を実プロパティとして持たせておく。
  // toEqual などの深い比較は Object.keys(target) でキーを列挙するので、
  // これがないと「キーが一つもない空オブジェクト」同士の比較となり、別のモックでも等しいと判定されてしまう。
  return new Proxy({ __id__: id }, {
    get(_, key) {
      // 識別子。比較時にはここで返す値が使われるので、モックごとに異なる値になる。
      // 先頭の "#" は失敗メッセージ等で見たときにモックの ID だとわかるようにするため
      if (key === "__id__") return `#${id}`;
      // Promise 判定（thenable 判定）を回避する。
      // then が関数だと await や mockResolvedValue(mock) / Promise.resolve(mock) で
      // Promise とみなされて then が呼ばれ、モック関数は resolve しないので永久に待ち続けてしまう
      if (key === "then") return;
      // Symbol.toPrimitive / Symbol.iterator / Symbol.toStringTag / util.inspect.custom などの
      // 言語機能・ランタイムのプロトコルに反応しないようにする。
      // これらが関数を返すと、文字列化やスプレッド、console.log などの挙動が壊れる
      if (typeof key === "symbol") return;
      // 文字列化（`${mock}` や String(mock)）したときに、どのモックか判別できる文字列を返す
      if (key === "toString") return () => `mock#${id}`;
      // JSON.stringify や、テスト失敗時の差分表示（pretty-format は toJSON があれば呼ぶ）で
      // モック関数の戻り値（undefined）ではなく、判別できる値を出力させる
      if (key === "toJSON") return () => ({ id: `#${id}` });
      // jest-when 対策。jest-when は calledWith の第1引数が `_isAllArgsFunctionMatcher === true` なら
      // when.allArgs のマッチャーとして扱う。モックを引数に渡したときに
      // マッチャーと誤認されないよう、明示的に false を返す
      // （新しい jest-when は `in` 演算子でも確認しているが、古いバージョン向けの保険）
      if (key === "_isAllArgsFunctionMatcher") return false;
      // mock<T>({ prop: 1 }) のように指定された関数以外のプロパティは、その値を返す
      if (overrideProps?.[key] != null) return overrideProps[key];
      // それ以外のキーにはモック関数を返す。アクセスのたびに同じ関数を返さないと、
      // `mock.method.mockReturnValue(...)` で設定した内容が `mock.method()` 呼び出し時に反映されないのでキャッシュする
      return fns[key] = fns[key] ?? createFn();
    }
  });
}
