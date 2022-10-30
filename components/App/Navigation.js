import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navigation() {
    const { t } = useTranslation('common');
    const { locale: activeLocale, locales, asPath } = useRouter();
    const availableLocales = locales.filter((locale) => locale !== activeLocale);

    return (
        <nav>
            <div className="container-padding flex justify-between border-b">
                <h2>Moonlet</h2>

                <div className="hidden lg:flex lg:space-x-2">
                    <div>{t('portfolio')}</div>
                    <div>{t('services')}</div>
                    <div>{t('about')}</div>
                    <div>{t('contact')}</div>
                    {availableLocales.map((locale) => (
                        <Link href={asPath} locale={locale} key={locale}>
                            <a className="uppercase">{locale}</a>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
