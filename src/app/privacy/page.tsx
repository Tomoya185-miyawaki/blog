export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">プライバシーポリシー</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">個人情報の利用目的</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトでは、お問い合わせの際にお名前やメールアドレス等の個人情報をご登録いただく場合がございます。
            これらの個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、
            個人情報をご提供いただく際の目的以外では利用いたしません。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">広告について</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトでは、第三者配信の広告サービス（Google AdSense）を利用しており、
            ユーザーの興味に応じた商品やサービスの広告を表示するため、
            クッキー（Cookie）を使用しております。
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            クッキーを使用することで当サイトはお客様のコンピューターを識別できるようになりますが、
            お客様個人を特定できるものではありません。
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Cookieを無効にする方法やGoogleアドセンスに関する詳細は、
            <a 
              href="https://policies.google.com/technologies/ads?gl=jp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              広告 – ポリシーと規約 – Google
            </a>
            をご覧ください。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">アクセス解析ツールについて</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。
            このGoogle Analyticsはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。
            トラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            この機能はCookieを無効にすることで収集を拒否することが出来ますので、
            お使いのブラウザの設定をご確認ください。
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Google Analyticsの利用規約に関して確認したい場合は、
            <a 
              href="https://marketingplatform.google.com/about/analytics/terms/jp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google アナリティクス利用規約
            </a>
            をご覧ください。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">アフィリエイトプログラムについて</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトは、Amazon.co.jp、楽天市場、A8.net等のアフィリエイトプログラムを利用しております。
            これらのプログラムは、商品やサービスの提供元企業が提供するCookieを使用して、
            当サイトが紹介料を獲得できる仕組みになっています。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">免責事項</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、
            正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">著作権について</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトで掲載している文章や画像などにつきましては、
            無断転載することを禁止します。
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            当サイトは著作権や肖像権の侵害を目的としたものではありません。
            著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。
            迅速に対応いたします。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">リンクについて</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。
            ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">プライバシーポリシーの変更について</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、
            本ポリシーの内容を適宜見直しその改善に努めます。
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
        </section>

        <section className="mt-12 pt-8 border-t">
          <p className="text-gray-600 text-sm">
            制定日: 2024年12月05日<br />
            最終改定日: 2024年12月05日
          </p>
          <p className="text-gray-600 text-sm mt-4">
            運営者: Freelance Dev Lab<br />
            お問い合わせ: 
            <a 
              href="mailto:contact@example.com" 
              className="text-blue-600 hover:underline ml-2"
            >
              contact@example.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
