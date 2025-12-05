# Google Analytics & AdSense セットアップガイド

このガイドでは、ブログにGoogle AnalyticsとGoogle AdSenseを設定する方法を説明します。

## 📊 Google Analytics 4 (GA4) の設定

### 1. GA4アカウントの作成

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 「測定を開始」をクリック
3. アカウント名を入力（例: Freelance Dev Lab）
4. プロパティ名を入力（例: blog）
5. レポートのタイムゾーン: 日本
6. 通貨: 日本円（JPY）

### 2. データストリームの設定

1. 「ウェブ」を選択
2. ウェブサイトのURL: `https://tomoya185-miyawaki.github.io`
3. ストリーム名: `blog`
4. 「ストリームを作成」をクリック

### 3. 測定IDの取得

1. 作成したデータストリームの詳細ページで **測定ID** をコピー
   - 形式: `G-XXXXXXXXXX`

### 4. 環境変数に設定

`.env.local` ファイルに測定IDを追加：

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 💰 Google AdSense の設定

### 1. AdSenseアカウントの作成

1. [Google AdSense](https://www.google.com/adsense/) にアクセス
2. 「ご利用開始」をクリック
3. ウェブサイトのURL: `https://tomoya185-miyawaki.github.io/blog/`
4. メールアドレスを入力
5. 利用規約に同意

### 2. サイトの追加と審査

1. AdSenseダッシュボードで「サイト」→「サイトを追加」
2. ブログのURLを入力
3. **AdSenseコード**をコピー（ca-pub-XXXXXXXXXXで始まる）
4. 審査を申請

⚠️ **注意**: 審査には以下の条件があります
- 独自のコンテンツ（最低10-15記事）
- プライバシーポリシーページ
- お問い合わせページ
- 定期的な更新

### 3. 広告ユニットの作成

審査に合格後、広告ユニットを作成します：

#### ディスプレイ広告（記事上下）

1. 「広告」→「広告ユニットごと」→「ディスプレイ広告」
2. 名前: `記事上部広告` / `記事下部広告`
3. 広告サイズ: レスポンシブ
4. 「作成」をクリック
5. **data-ad-slot** の値をコピー（10桁の数字）

#### 記事内広告

1. 「広告」→「広告ユニットごと」→「記事内広告」
2. 名前: `記事内広告`
3. 「作成」をクリック
4. **data-ad-slot** の値をコピー

### 4. 環境変数に設定

`.env.local` ファイルに広告IDを追加：

```bash
# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX

# 広告スロットID
NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY=0987654321
```

---

## 🚀 デプロイ

### GitHub Actionsの環境変数設定

GitHub Pagesにデプロイする場合、GitHubリポジトリに環境変数を設定します：

1. GitHubリポジトリの **Settings** に移動
2. **Secrets and variables** → **Actions** をクリック
3. **New repository secret** をクリック
4. 以下の環境変数を追加：

```
Name: NEXT_PUBLIC_GA_MEASUREMENT_ID
Secret: G-XXXXXXXXXX

Name: NEXT_PUBLIC_ADSENSE_CLIENT_ID
Secret: ca-pub-XXXXXXXXXX

Name: NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE
Secret: 1234567890

Name: NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY
Secret: 0987654321
```

### GitHub Actionsワークフローの更新

`.github/workflows/deploy.yml` のビルドステップに環境変数を追加：

```yaml
- name: Build with Next.js
  run: npm run build
  env:
    NODE_ENV: production
    NEXT_PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.NEXT_PUBLIC_GA_MEASUREMENT_ID }}
    NEXT_PUBLIC_ADSENSE_CLIENT_ID: ${{ secrets.NEXT_PUBLIC_ADSENSE_CLIENT_ID }}
    NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE: ${{ secrets.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE }}
    NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY: ${{ secrets.NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY }}
```

---

## 📈 広告配置の最適化

### 現在の広告配置

1. **記事上部** - ディスプレイ広告（タイトル下）
2. **記事内** - 記事内広告（コンテンツ中央）
3. **記事下部** - ディスプレイ広告（記事終了後）

### 収益最大化のコツ

- ✅ **ファーストビュー**に1つ広告を配置（記事上部）
- ✅ **記事の途中**に1つ広告を配置（読者の集中が途切れるタイミング）
- ✅ **記事終了後**に1つ広告を配置（次の行動を促す）
- ❌ 広告を多く配置しすぎない（3-4個まで）

### クリック率（CTR）向上のポイント

1. **コンテンツの質**を高める（滞在時間↑）
2. **ターゲット読者**を明確にする（関連広告が表示される）
3. **モバイル最適化**（70%以上がモバイル流入）
4. **ページ表示速度**を改善（離脱率↓）

---

## 📊 分析と改善

### Google Analyticsで見るべき指標

- **ページビュー数（PV）**
- **ユーザー数**
- **平均セッション時間**
- **直帰率**
- **流入元**（検索、SNS、直接など）

### AdSenseで見るべき指標

- **クリック率（CTR）**
- **クリック単価（CPC）**
- **ページRPM**（1000PVあたりの収益）
- **視認可能なインプレッション率**

### 月5万円達成のシミュレーション

```
前提条件:
- 平均CTR: 1.5%
- 平均CPC: ¥50
- ページRPM: ¥750

必要PV数:
¥50,000 ÷ ¥750 × 1,000 = 約67,000 PV/月

1日あたり: 67,000 ÷ 30 = 約2,200 PV/日
```

---

## ✅ チェックリスト

### 初期設定
- [ ] Google Analyticsアカウント作成
- [ ] GA4測定IDを取得
- [ ] Google AdSenseアカウント作成
- [ ] AdSense審査申請
- [ ] `.env.local`に環境変数を設定

### 審査対策
- [ ] 10-15記事以上を投稿
- [ ] プライバシーポリシーページ作成
- [ ] お問い合わせページ作成
- [ ] 独自ドメイン取得（推奨）
- [ ] 定期的な更新（週2-3記事）

### デプロイ
- [ ] GitHubにSecretsを設定
- [ ] GitHub Actionsワークフローを更新
- [ ] ビルド成功を確認
- [ ] 本番環境で動作確認

### 運用
- [ ] 毎週GAでアクセス解析
- [ ] 毎月AdSenseで収益確認
- [ ] 高収益記事の分析
- [ ] 低収益記事の改善

---

## 🔗 参考リンク

- [Google Analytics ヘルプ](https://support.google.com/analytics/)
- [Google AdSense ヘルプ](https://support.google.com/adsense/)
- [Next.js 環境変数](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
