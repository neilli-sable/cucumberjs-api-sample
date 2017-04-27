var {defineSupportCode} = require('cucumber');
var fs = require('fs');
var fetch = require('node-fetch');
var assert = require('chai').assert;
var FormData = require('form-data');

var helper = require(__dirname + '/../support/test_helper.js');

var baseUrl = 'https://jsonplaceholder.typicode.com/'
var _formTable, _json;

defineSupportCode(function({Given, When, Then}) {

  Given('共通の事前準備をする。', function (callback) {
    // SQLを流してテスト用データを用意したりする。
    // このサンプルでは何もしない。
    callback();
  });

  Given('これらの引数を渡す。', function(table, callback) {
    _formTable = table;
    callback();
  });

  Given('引数を渡さない。', function (callback) {
    _formTable = null;
    callback();
  });

  When('"{apiName}" を呼び出し、レスポンスを取得する。', function (apiName, callback) {
    var query = '';
    // 引数があればqueryを組み立てる
    if (_formTable) {
      query += '?';
      _formTable.hashes().forEach(function(hash) {
        query += `${hash.attribute}=${hash.value}`;
      });
    }
    var result = fetch(baseUrl + apiName + query, {
      method: 'GET',
    })
    // レスポンスをjsonとして取得
    .then(function(response) {
      return response.json();
    })
    // レスポンスを変数に格納
    .then(function(json) {
      _json = json;
      callback();
    }).catch(function(error) {
      callback(error);
    });

  });

  Then('レスポンスの配列は{count}個の要素をもつ。', function (count, callback) {
    assert.equal(_json.length, parseInt(count));
    callback();
  });

  Then('レスポンスの{arrayName}配列は{count}個の要素をもつ。', function (arrayName, count, callback) {
    var target = helper.dive(arrayName, _json);
    assert.equal(target.length, parseInt(count));
    callback();
  });

  Then('レスポンスの配列は、これらのパラメータをもつオブジェクトを一つは含む。', function (table, callback) {
    var exists = helper.arraySome(_json, table);
    assert.isOk(exists, '期待する結果をもつ要素が一つもありません。');
    callback();
  });

  Then('レスポンスの"{arrayName}"配列は、これらのパラメータをもつオブジェクトを一つは含む。', function (table, arrayName, callback) {
    var target = helper.dive(arrayName, _json);

    var exists = helper.arraySome(target, table);
    assert.isOk(exists, '期待する結果をもつ要素が一つもありません。');
    callback();
  });

  Given('レスポンスの{objectName}オブジェクトは、{count}個のパラメータを含む。', function (objectName, count, callback) {
    var target = helper.dive(objectName, _json);
    var targetLength = 0;
    for (var _ in target) { ++targetLength; }

    assert.equal(targetLength, parseInt(count));
    callback();
  });

  Given('レスポンスの{objectName}オブジェクトは、これらのパラメータを含む。', function (objectName, table, callback) {
    var target = helper.dive(objectName, _json);

    helper.objectEqual(table.hashes(), target);
    callback();
  });

  Then('事後処理をする。', function (callback) {
    // SQLを流してテスト用データを削除したりする。
    // このサンプルでは何もしない。
    callback();
  });

});
