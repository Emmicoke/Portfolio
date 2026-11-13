import resumeEn from '../assets/pdf/FahrettinEminKORKUTCVen.pdf'
import resumeTr from '../assets/pdf/FahrettinEminKORKUTCVtr.pdf'
import profile from '../ImageFile/profile.jpg'

export const headerData = {
    name: 'Fahrettin Emin Korkut',
    title: "Software Engineer",
    desciption:"Life may be a meandering path but don't worry about it, rather enjoy it. It is about the journey, not the destination so explore all that comes your way, learn and grow from it, for this journey only happens once.",
    // profile.jpg is a 4:5 web-sized crop of ImageFile/DSC02940.JPG
    image: profile,
    // the CV button downloads the file matching the site language
    resumePdf: { en: resumeEn, tr: resumeTr }
}
