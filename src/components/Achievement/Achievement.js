import React, { useEffect, useRef, useState } from 'react';

import './Achievement.css';
import AchievementCard from './AchievementCard';
import { usePrefs } from '../../i18n/Preferences';
import { contentTr, localDate } from '../../i18n/content';
import { achievementData } from '../../data/achievementData';

function Achievement() {
    const { t, pick, lang } = usePrefs();
    const [activeId, setActiveId] = useState(null);
    const dialogRef = useRef(null);
    const items = achievementData.achievements.map((item) => {
        const a = pick(item, ['achievements', item.id]);
        return {
            ...a,
            date: localDate(a.date, lang),
            field: lang === 'tr' ? contentTr.fields[a.field] || a.field : a.field,
        };
    });
    const active = items.find((a) => a.id === activeId) || null;
    const setActive = (a) => setActiveId(a ? a.id : null);
    const bio = lang === 'tr' ? contentTr.achievementBio : achievementData.bio;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (activeId && !dialog.open) dialog.showModal ? dialog.showModal() : dialog.setAttribute('open', '');
        if (!activeId && dialog.open) dialog.close ? dialog.close() : dialog.removeAttribute('open');
    }, [activeId]);

    if (!items.length) return null;

    return (
        <section className="block achievement" id="achievement">
            <div className="wrap">
                <div className="achievement-head">
                    <h2 className="heading">{t('achievements.title')}</h2>
                    {achievementData.bio && <p className="achievement-bio">{bio}</p>}
                </div>
            </div>

            <ul className="achievement-strip" aria-label={t('achievements.list')}>
                {items.map((achieve) => (
                    <AchievementCard
                        key={achieve.id}
                        id={achieve.id}
                        title={achieve.title}
                        details={achieve.details}
                        date={achieve.date}
                        field={achieve.field}
                        image={achieve.image}
                        enlargeLabel={t('achievements.enlarge', { title: achieve.title })}
                        onOpen={() => setActive(achieve)}
                    />
                ))}
            </ul>

            <dialog
                ref={dialogRef}
                className="certificate-dialog"
                onClose={() => setActive(null)}
                onClick={(e) => e.target === dialogRef.current && setActive(null)}
            >
                {active && (
                    <div className="certificate-sheet">
                        <img src={active.image} alt={`${active.title} certificate`} />
                        <div className="certificate-meta">
                            <div>
                                <h3>{active.title}</h3>
                                <p>
                                    {active.details}, {active.date}
                                </p>
                            </div>
                            <button className="button button--line" onClick={() => setActive(null)}>
                                {t('achievements.close')}
                            </button>
                        </div>
                    </div>
                )}
            </dialog>
        </section>
    );
}

export default Achievement;
