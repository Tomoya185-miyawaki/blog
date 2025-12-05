# Google Analytics 4 (GA4) 設定ガイド

## 🎯 GA4アカウント作成の手順

### 1. Google Analyticsにアクセス

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. Googleアカウントでログイン
3. 「測定を開始」をクリック

### 2. アカウントの設定

**アカウント名**を入力：
```
例: Freelance Dev Lab
または: あなたの名前
```

**アカウントのデータ共有設定**（推奨設定）：
- ✅ Googleのプロダクトやサービス
- ✅ ベンチマーク
- ✅ テクニカルサポート
- ⬜ アカウントスペシャリスト（任意）

「次へ」をクリック

### 3. プロパティの設定

**プロパティ名**を入力：
```
例: blog
または: Freelance Dev Lab Blog
```

**レポートのタイムゾーン**:
```
日本
```

**通貨**:
```
日本円（JPY）
```

「次へ」をクリック

### 4. ビジネス情報の入力

**業種**を選択：
```
例: テクノロジー / メディア・出版
```

**ビジネスの規模**:
```
小規模 - 従業員数1～10名
```

**Analyticsの利用目的**（複数選択可）:
- ✅ サイトまたはアプリのユーザー行動を調べる
- ✅ コンバージョンを測定する

「作成」をクリック

### 5. 利用規約に同意

- 国を「日本」に選択
- 利用規約を読んで「同意する」にチェック
- 「同意する」をクリック

---

## 🌐 データストリームの作成

### 1. プラットフォームの選択

「ウェブ」を選択

### 2. データストリームの詳細

**ウェブサイトのURL**:
```
https://tomoya185-miyawaki.github.io
```

**ストリーム名**:
```
blog
または: Freelance Dev Lab
```

**拡張計測機能**（推奨）:
- ✅ ページビュー
- ✅ スクロール数
- ✅ 離脱クリック
- ✅ サイト内検索
- ✅ 動画エンゲージメント
- ✅ ファイルのダウンロード

「ストリームを作成」をクリック

---

## 🔑 測定IDの取得

### データストリームの詳細ページで

1. **測定ID**が表示されます
   ```
   形式: G-XXXXXXXXXX
   例: G-ABC123XYZ4
   ```

2. この測定IDをコピーしてください

---

## ⚙️ ブログへの設定

### 1. ローカル環境での設定

`.env.local` ファイルを編集：

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**例**:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ4
```

### 2. 動作確認（ローカル）

開発サーバーを起動：
```bash
npm run dev
```

ブラウザで開く：
```
http://localhost:13000
```

ブラウザの開発者ツール（F12）を開き、Consoleタブで以下を確認：
```javascript
// gtag関数が定義されているか確認
console.log(typeof gtag)
// "function" と表示されればOK
```

### 3. GitHub Secretsへの登録

GitHub Pagesにデプロイする場合、GitHubリポジトリに環境変数を設定します。

#### 手順:

1. GitHubリポジトリページを開く
   ```
   https://github.com/Tomoya185-miyawaki/blog
   ```

2. **Settings** タブをクリック

3. 左メニューから **Secrets and variables** → **Actions** を選択

4. **New repository secret** をクリック

5. 以下を入力：
   ```
   Name: NEXT_PUBLIC_GA_MEASUREMENT_ID
   Secret: G-XXXXXXXXXX（あなたの測定ID）
   ```

6. **Add secret** をクリック

### 4. デプロイして確認

変更をプッシュ：
```bash
git add .
git commit -m "config: Add Google Analytics measurement ID"
git push origin main
```

GitHub Actionsが自動でデプロイします。

---

## 📈 Google Analyticsでデータを確認

### リアルタイムデータの確認

1. Google Analyticsダッシュボードに戻る
2. 左メニューから **レポート** → **リアルタイム** を選択
3. 本番サイトにアクセスして、リアルタイムでユーザーが表示されるか確認

**確認URL**:
```
https://tomoya185-miyawaki.github.io/blog/
```

### データが表示されない場合のチェックリスト

#### 1. 測定IDが正しいか確認
```bash
# ブラウザの開発者ツール（F12）→ Network タブ
# "collect" または "analytics" で検索
# リクエストに測定IDが含まれているか確認
```

#### 2. スクリプトが読み込まれているか確認
```bash
# ブラウザの開発者ツール（F12）→ Elements タブ
# <head>内に以下があるか確認:
<script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

#### 3. 広告ブロッカーを無効化
- 広告ブロッカー（uBlock Origin、AdBlockなど）がGAをブロックしている可能性
- 一時的に無効化してテスト

#### 4. GitHub Secretsが正しく設定されているか
```bash
# GitHub Actions のビルドログで環境変数を確認
# （値は表示されませんが、設定されているかは確認可能）
```

---

## 🎯 重要な指標の見方

### 1. ページビュー（PV）
```
レポート → エンゲージメント → ページとスクリーン
```
- どのページが最も見られているか
- 1日あたりのPV数

### 2. ユーザー数
```
レポート → ユーザー → ユーザー属性
```
- 新規ユーザー vs リピーター
- 地域、デバイス、ブラウザ

### 3. 平均エンゲージメント時間
```
レポート → エンゲージメント → エンゲージメントの概要
```
- ユーザーがどれくらい滞在しているか
- 直帰率の代替指標

### 4. 流入元
```
レポート → 集客 → トラフィック獲得
```
- Organic Search（検索）
- Direct（直接）
- Referral（他サイトからのリンク）
- Social（SNS）

---

## 📊 月5万円達成に必要なPV数の計算

### AdSenseと組み合わせた場合

**前提条件**:
- ページRPM（1000PVあたりの収益）: ¥500-1,000
- 平均: ¥750

**必要PV数の計算**:
```
目標収益: ¥50,000/月

必要PV = ¥50,000 ÷ ¥750 × 1,000
       = 約 67,000 PV/月

1日あたり = 67,000 ÷ 30
          = 約 2,200 PV/日
```

### GAでの目標設定

1. **管理** → **データストリーム** → **イベント** をクリック
2. カスタムイベントを作成して、目標を追跡

---

## ✅ セットアップ完了チェックリスト

- [ ] Google Analyticsアカウント作成
- [ ] プロパティ作成（日本、JPY設定）
- [ ] データストリーム作成（ウェブ）
- [ ] 測定ID取得（G-XXXXXXXXXX）
- [ ] `.env.local`に測定ID設定
- [ ] ローカルで動作確認
- [ ] GitHub Secretsに測定ID登録
- [ ] 本番環境にデプロイ
- [ ] リアルタイムレポートで確認
- [ ] 24時間後にデータが蓄積されているか確認

---

## 🔗 参考リンク

- [Google Analytics ヘルプセンター](https://support.google.com/analytics/)
- [GA4 設定アシスタント](https://support.google.com/analytics/answer/9304153)
- [Next.js × Google Analytics 統合](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

## 💡 トラブルシューティング

### データが24時間経っても表示されない

1. ブラウザのキャッシュをクリア
2. シークレットモードでアクセス
3. 測定IDを再確認
4. GitHub Actionsのビルドログを確認

### リアルタイムには表示されるが、レポートに表示されない

- 通常、レポートには24-48時間のデータ処理時間が必要
- リアルタイムで表示されていればOK

### 自分のアクセスを除外したい

1. **管理** → **データストリーム** をクリック
2. 対象のストリームを選択
3. **タグ付けの詳細設定** → **内部トラフィックの定義** を設定
4. 自分のIPアドレスを登録
