var assert = require('chai').assert;

/**
 * dive objectの中から、指定した要素を返す。
 * @param  {string} targetPath 指定した要素のパス
 * @param  {object} object     検索対象オブジェクト
 * @return {any}               指定した要素
 */
function dive(targetPath, object) {
  if (!targetPath) {
    return object;
  }

  var targetNames = targetPath.split('.');
  var currentObj = object;

  targetNames.forEach(function(aTarget) {
    currentObj = currentObj[aTarget];
  });
  return currentObj;
}

/**
 * arraySome 一つでも条件に一致したオブジェクトがある？
 * @param  {array} target 調査対象の配列
 * @param  {table} table  条件テーブル
 * @return {bool}        true:条件に一致したオブジェクトがある, false:ない
 */
function arraySome(target, table) {
  var typedValue;
  var exists = target.some(function(responseRow) {
    // オブジェクトの中身は全て条件と一致する？
    var allEqual = table.hashes().every(function(expectedRow) {
      typedValue = typeAs(expectedRow.value, expectedRow.type);

      if (expectedRow.type === 'Array') {
        assert.isOk(
          Array.isArray(responseRow[expectedRow.attribute]),
          expectedRow.attribute + ' は配列ではありません'
        );
        return true;
      }
      if (expectedRow.type === 'Object') {
        assert.isOk(
          isObject(responseRow[expectedRow.attribute]),
          expectedRow.attribute + ' はオブジェクトではありません'
        );
        return true;
      }
      if (responseRow[expectedRow.attribute] === typedValue) {
        return true;
      }
      return false;
    });

    return allEqual;
  });

  return exists;
}

/**
 * objectEqual 期待する値と実際の値をひとつずつ比較する
 * @param  {object} expect 期待する値(オブジェクト　)
 * @param  {object} fact   実際の値(オブジェクト)
 */
function objectEqual(expect, fact) {
  var typedValue;

  expect.forEach(function(row) {
    if (row.type === 'Array') {
      assert.isOk(
        Array.isArray(fact[row.attribute]),
        row.attribute + ' は配列ではありません'
      );
      return;
    }
    if (row.type === 'Object') {
      assert.isOk(
        isObject(fact[row.attribute]),
        row.attribute + ' はオブジェクトではありません'
      );
      return;
    }

    typedValue = typeAs(row.value, row.type);
    assert.equal(fact[row.attribute], typedValue);
  });
}

/**
 * typeAs 条件テーブルの型・値をJavaScriptのリテラルに変換する。
 * @param  {any}    value 値
 * @param  {string} type  型
 * @return {any}          型に変換した値
 */
function typeAs(value, type) {
  if (type === 'Boolean') {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
  }
  if (type === 'Integer') {
    return value - 0;
  }
  if (type === 'String') {
    return value.replace(/\\n/g, '\n');
  }
  if (type === 'Null') {
    return null;
  }
  return value;
}

/**
 * オブジェクトかどうか確認する
 * @param  {any}  val    確認対象
 * @return {Boolean}     true:オブジェクトである, false:オブジェクトでない
 */
function isObject(val) {
  return (val !== null && typeof val === 'object' && Array.isArray(val) === false);
}

module.exports = {
  dive: dive,
  arraySome: arraySome,
  objectEqual: objectEqual,
  typeAs: typeAs
};
