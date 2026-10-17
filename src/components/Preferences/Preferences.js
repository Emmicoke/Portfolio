import React from 'react';

import './Preferences.css';
import { usePrefs } from '../../i18n/Preferences';

function Switch({ label, options, value, onChange }) {
    return (
        <div className="pref" role="group" aria-label={label}>
            {options.map((o) => (
                <button
                    key={o.value}
                    type="button"
                    className="pref-option"
                    aria-pressed={value === o.value}
                    title={o.title}
                    onClick={() => onChange(o.value)}
                >
                    {o.label}
                </button>
            ))}
        </div>
    );
}

function Preferences() {
    const { t, lang, setLang, mode, setMode } = usePrefs();
    return (
        <div className="prefs">
            <Switch
                label={t('pref.language')}
                value={lang}
                onChange={setLang}
                options={[
                    { value: 'en', label: 'EN', title: t('pref.en') },
                    { value: 'tr', label: 'TR', title: t('pref.tr') },
                ]}
            />
            <Switch
                label={t('pref.theme')}
                value={mode}
                onChange={setMode}
                options={[
                    { value: 'light', label: t('pref.light') },
                    { value: 'dark', label: t('pref.dark') },
                ]}
            />
        </div>
    );
}

export default Preferences;
