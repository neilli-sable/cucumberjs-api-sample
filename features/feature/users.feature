Feature: ユーザー取得API。

Background:
    Given 共通の事前準備をする。

Scenario: 全ユーザー一覧を取得する。
    Given 引数を渡さない。
    When "users" を呼び出し、レスポンスを取得する。
    Then レスポンスの配列は10個の要素をもつ。
    And レスポンスの配列は、これらのパラメータをもつオブジェクトを一つは含む。
      |attribute       |type       |value                 |
      |name            |String     |Leanne Graham         |
      |username        |String     |Bret                  |
      |email           |String     |Sincere@april.biz     |
      |address         |Object     |                      |
      |phone           |String     |1-770-736-8031 x56442 |
      |website         |String     |hildegard.org         |
      |company         |Object     |                      |
    And レスポンスの配列は、これらのパラメータをもつオブジェクトを一つは含む。
      |attribute       |type       |value                 |
      |name            |String     |Clementina DuBuque    |
      |username        |String     |Moriah.Stanton        |
      |email           |String     |Rey.Padberg@karina.biz|
      |address         |Object     |                      |
      |phone           |String     |024-648-3804          |
      |website         |String     |ambrose.net           |
      |company         |Object     |                      |
    And 事後処理をする。

Scenario: 特定のユーザーを取得する。
    Given これらの引数を渡す。
      |attribute    |value       |type       |
      |id           |3           |String     |
    When "users" を呼び出し、レスポンスを取得する。
    And レスポンスの配列は1個の要素をもつ。
    And レスポンスの配列は、これらのパラメータをもつオブジェクトを一つは含む。
      |attribute       |type       |value                 |
      |name            |String     |Clementine Bauch      |
      |username        |String     |Samantha              |
      |email           |String     |Nathan@yesenia.net    |
      |address         |Object     |                      |
      |phone           |String     |1-463-123-4447        |
      |website         |String     |ramiro.info           |
      |company         |Object     |                      |
    And レスポンスの0.addressオブジェクトは、5個のパラメータを含む。
    And レスポンスの0.addressオブジェクトは、これらのパラメータを含む。
      |attribute       |type       |value                 |
      |street          |String     |Douglas Extension     |
      |suite           |String     |Suite 847             |
      |city            |String     |McKenziehaven         |
      |zipcode         |String     |59590-4157            |
      |geo             |Object     |                      |
    And レスポンスの0.companyオブジェクトは、3個のパラメータを含む。
    And レスポンスの0.companyオブジェクトは、これらのパラメータを含む。
      |attribute       |type       |value                             |
      |name            |String     |Romaguera-Jacobson                |
      |catchPhrase     |String     |Face to face bifurcated interface                     |
      |bs              |String     |e-enable strategic applications   |
    And 事後処理をする。
