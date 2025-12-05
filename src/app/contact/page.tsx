import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">お問い合わせ</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed mb-8">
          Freelance Dev Labをご覧いただきありがとうございます。<br />
          ご質問、ご要望、記事の誤りなどがございましたら、下記の方法でお問い合わせください。
        </p>

        <section className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">お問い合わせ方法</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">📧 メールでのお問い合わせ</h3>
              <p className="text-gray-700">
                以下のメールアドレス宛にお問い合わせください。<br />
                （2-3営業日以内にご返信いたします）
              </p>
              <a 
                href="mailto:tomo16185@gmail.com" 
                className="inline-block mt-2 text-blue-600 hover:underline text-lg font-medium"
              >
                tomo16185@gmail.com
              </a>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">お問い合わせの際の注意事項</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>ご質問内容は具体的にお書きください</li>
            <li>記事の誤りを指摘する際は、該当記事のURLをご記載ください</li>
            <li>営業目的のご連絡はご遠慮ください</li>
            <li>頂いた個人情報は、お問い合わせへの回答以外には使用いたしません</li>
            <li>内容によってはご返信できない場合がございます</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">よくあるご質問</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Q. 記事の内容について質問したいです</h3>
              <p className="text-gray-700">
                A. 記事のコメント欄またはメールでお気軽にご質問ください。
                できる限り回答させていただきます。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Q. 記事に誤りを見つけました</h3>
              <p className="text-gray-700">
                A. 大変申し訳ございません。該当記事のURLと誤りの内容をメールでお知らせください。
                確認の上、速やかに修正いたします。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Q. 記事の転載を希望しています</h3>
              <p className="text-gray-700">
                A. 原則として転載はお断りしておりますが、引用元を明記の上、
                リンクを貼っていただける場合は部分的な引用は可能です。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Q. 広告掲載について相談したいです</h3>
              <p className="text-gray-700">
                A. 広告掲載のご相談は、メールにて詳細をお送りください。
                内容を確認の上、ご返信させていただきます。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Q. 取材・執筆の依頼をしたいです</h3>
              <p className="text-gray-700">
                A. 取材・執筆のご依頼は、メールにて詳細（目的、内容、納期、報酬など）をお送りください。
                内容を確認の上、ご返信させていただきます。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">個人情報の取り扱いについて</h2>
          <p className="text-gray-700 text-sm">
            お問い合わせの際にご提供いただいた個人情報は、
            お問い合わせへの回答および必要な連絡のみに使用いたします。<br />
            詳しくは
            <Link href="/privacy" className="text-blue-600 hover:underline ml-1">
              プライバシーポリシー
            </Link>
            をご覧ください。
          </p>
        </section>
      </div>
    </div>
  )
}
