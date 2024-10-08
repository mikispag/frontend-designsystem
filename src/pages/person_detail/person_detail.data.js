const _ = require('lodash');
const defaultData = require('../../data/default.data.js');
const dataHelper = require('@unic/estatico-data');

const skiplinksData = require('../../modules/skiplinks/skiplinks.data.js').variants.default.props;
const headerData = require('../../modules/header/header.data').variants.inverted.props;

const defPageHeaderData = require('../../modules/page_header/page_header.data.js').variants.default.props;
const defImageFigureData = require('../../modules/image_figure/image_figure.data.js');
const defVideoData = require('../../modules/video/video.data.js');
const defAccordionData = require('../../modules/accordion/accordion.data.js');
const defTableData = require('../../modules/table/table.data.js');
const defNewsTeaserData = require('../../modules/news_teaser/news_teaser.data');
const defImageGalleryData = require('../../modules/image_gallery/image_gallery.data');
const defLinklistData = require('../../modules/linklist/linklist.data');
const defcontactData = require('../../modules/contact/contact.data');
const defPersonCardData = require('../../modules/person_card/person_card.data.js');
const defSocialLinksData = require('../../modules/social_media_links/social_media_links.data.js');
const defFooterData = require('../../modules/footer/footer.data').variants.default.props;
const defBack2TopData = require('../../modules/back2top/back2top.data').variants.default.props;

const defAnchorNavData = {
  anchornavTitle: {
    level: 2,
    title: 'Inhaltsverzeichnis',
  },
  anchornavItems: [
    {
      anchorlink: {
        anchorlinkText: 'Willkommen',
        anchorlinkAdress: 'welcome',
        anchorlinkIsActive: true,
        anchorlinkAsButton: true,
      },
    },
    {
      anchorlink: {
        anchorlinkText: 'Standpunkte & Reden',
        anchorlinkAdress: 'speech',
        anchorlinkIsActive: false,
        anchorlinkAsButton: true,
      },
    },
    {
      anchorlink: {
        anchorlinkText: 'Geplante Auftritte',
        anchorlinkAdress: 'events',
        anchorlinkIsActive: false,
        anchorlinkAsButton: true,
      },
    },
    {
      anchorlink: {
        anchorlinkText: 'Bilder',
        anchorlinkAdress: 'pictures',
        anchorlinkIsActive: false,
        anchorlinkAsButton: true,
      },
    },
    {
      anchorlink: {
        anchorlinkText: 'Biografie',
        anchorlinkAdress: 'bio',
        anchorlinkIsActive: false,
        anchorlinkAsButton: true,
      },
    },
    {
      anchorlink: {
        anchorlinkText: 'Weiterführende Informationen',
        anchorlinkAdress: 'furtherinfo',
        anchorlinkIsActive: false,
        anchorlinkAsButton: true,
      },
    },
    {
      anchorlink: {
        anchorlinkText: 'Kontakt',
        anchorlinkAdress: 'contact',
        anchorlinkIsActive: false,
        anchorlinkAsButton: true,
      },
    },
    {
      anchorlink: {
        anchorlinkText: 'Scoial Media',
        anchorlinkAdress: 'socialmedia',
        anchorlinkIsActive: false,
        anchorlinkAsButton: true,
      },
    },
  ],
};

const defClearTableData = {
  tableHeadingLevel: 4,
  headers: [
    {
      title: '',
    }, {
      title: '',
    }, {
      title: '',
    }, {
      title: '',
    },
  ],
};

const data = _.merge({}, defaultData, {
  meta: {
    title: 'Personen-Detailseite',
    jira: 'CZHDEV-515',
    content: dataHelper.getFileContent('person_detail.hbs'),
    documentation: dataHelper.getDocumentation('README.md'),
  },
  props: {
    title: 'Title',
    skiplinks: skiplinksData,
    header: headerData,
    modules: {
      pageHeaderData: _.merge({}, defPageHeaderData, {
        pageTitle: 'Regierungsrätin Jacqueline Fehr',
        leadText: 'Vorsteherin, Direktion der Justiz und des Innern',
        buttonData: false,
        inverted: false,
        breadcrumb: null,
      }),
      anchorNav: defAnchorNavData,
      imageFigureData: defImageFigureData,
      videoData: defVideoData.variants.default.props,
      accordionData: _.merge({}, defAccordionData.variants.default.props, {
        smallerHeadings: true,
        anchorReference: 'speech',
        accordionHeading: {
          title: 'Standpunkte & Reden',
        },
        items: [
          {
            title: '2019',
            accordionPanelID: _.uniqueId('accordionPersonDetailDemoId-'),
          },
          {
            title: '2018',
            accordionPanelID: _.uniqueId('accordionPersonDetailDemoId-'),
          },
          {
            title: '2017',
            accordionPanelID: _.uniqueId('accordionPersonDetailDemoId-'),
          },
          {
            title: '2016',
            accordionPanelID: _.uniqueId('accordionPersonDetailDemoId-'),
          },
        ],
      }),
      tableData1: _.merge({},
        defTableData.variants.default.props,
        {
          tableTitle: 'Juni 2019',
        },
        defClearTableData),
      tableData2: _.merge({},
        defTableData.variants.default.props,
        {
          tableTitle: 'Juli 2019',
        },
        defClearTableData),
      tableData3: _.merge({},
        defTableData.variants.default.props,
        {
          tableTitle: 'August 2019',
        },
        defClearTableData),
      newsTeaserData: defNewsTeaserData.variants.withoutLinklist.props,
      imageGalleryData: _.merge({}, defImageGalleryData.variants.default.props, { anchorReference: 'pictures' }),
      tableData4: _.merge({},
        defTableData.variants.default.props,
        {
          tableTitle: 'Politische Tätigkeiten',
        },
        defClearTableData, {
          headers: [
            {
              title: 'Jahr',
              isSortable: false,
            }, {
              title: 'Tätigkeit',
              isSortable: false,
            },
          ],
        }),
      tableData5: _.merge({},
        defTableData.variants.default.props,
        {
          tableTitle: 'Weitere Tätigkeiten',
        },
        defClearTableData, {
          headers: [
            {
              title: 'Jahr',
              isSortable: false,
            }, {
              title: 'Tätigkeit',
              isSortable: false,
            },
          ],
        }),
      linklistData: _.merge({},
        _.omit(defLinklistData.variants.default.props, ['links']),
        {
          isLast: true,
          anchorReference: 'furtherinfo',
          linkListTitle: 'Weiterführende Information',
          links: [
            {
              linkListItemTitle: 'Zur Website von Jacqueline Fehr',
              linkListItemHref: '/',
            }, {
              linkListItemTitle: 'Zum Wikipedia Eintrag von Jaqueline Fehr',
              linkListItemHref: 'https://www.google.ch',
              target: 'blank',
            },
          ],
        }),
      personCardData: _.merge({}, defPersonCardData.variants.default.props, {
        isStandalone: true,
      }),
      contactData: _.merge({}, defcontactData.variants.fullWidthLessData.props, { anchorNavReference: 'contact' }),
      socialLinksData: _.merge({}, _.omit(defSocialLinksData.variants.default.props, ['linkedIn'], ['youtube']), { anchorReference: 'socialmedia' }),
      footerData: defFooterData,
      back2topData: _.merge({}, defBack2TopData, { preserveLangSwitch: false }),
    },
  },
});

data.props.modules.pageHeaderData.breadcrumb = {
  contextMenu: false,
  backOnly: true,
  path: [
    {
      title: 'Zurück',
      href: '#',
    },
  ],
};

module.exports = data;
