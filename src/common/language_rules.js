const languages = window.jw_epub_parser.languages;

export const getMonthNames = (lang) => {
  return [
    { index: 0, name: languages[lang].januaryVariations },
    { index: 1, name: languages[lang].februaryVariations },
    { index: 2, name: languages[lang].marchVariations },
    { index: 3, name: languages[lang].aprilVariations },
    { index: 4, name: languages[lang].mayVariations },
    { index: 5, name: languages[lang].juneVariations },
    { index: 6, name: languages[lang].julyVariations },
    { index: 7, name: languages[lang].augustVariations },
    { index: 8, name: languages[lang].septemberVariations },
    { index: 9, name: languages[lang].octoberVariations },
    { index: 10, name: languages[lang].novemberVariations },
    { index: 11, name: languages[lang].decemberVariations },
  ];
};

export const getTGWTalkVariations = (lang) => languages[lang].tgwTalk10Variations;

export const getTGWBibleReadingVariations = (lang) => languages[lang].tgwBibleReadingVariations;

export const getAssignmentsName = (lang) => [
  languages[lang].initialCallVideoVariations,
  languages[lang].returnVisitVideoVariations,
  languages[lang].memorialInvitationVideoVariations,
  languages[lang].initialCallVariations,
  languages[lang].returnVisitVariations,
  languages[lang].bibleStudyVariations,
  languages[lang].talkVariations,
  languages[lang].memorialInvitationVariations,
];

export const getAssignmentsVariations = (lang) => languages[lang].assignmentAyfVariations;

export const getLivingPartsVariations = (lang) => languages[lang].assignmentLcVariations;

export const getCBSVariations = (lang) => languages[lang].cbsVariations;

export const getConcludingSongFormat = (lang) => languages[lang].concludingSongVariations;

export const getStudyArticleDateVariations = (lang) => languages[lang].studyArticleDateVariations;
