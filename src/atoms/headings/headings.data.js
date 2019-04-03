const _ = require('lodash');
const dataHelper = require('@unic/estatico-data');
const { handlebars } = require('@unic/estatico-handlebars');
const defaultData = require('../../data/default.data.js');

const template = dataHelper.getFileContent('headings.hbs');
const data = _.merge({}, defaultData, {
  meta: {
    title: 'Überschriften',
    className: 'Überschriften',
    jira: 'CZHDEV-189',
    documentation: dataHelper.getDocumentation('headings.md'),
    hideFromListing: false,
  },
  props: {

  },
});
const variants = _.mapValues({
  default: {
    meta: {
      title: 'Blank',
      desc: 'Standard HTML-Elemente ohne Klassen',
    },
    props: {
      title: 'Überschrift Stufe',
      small: 'mit kleinem Text',
      link: 'und einem Link',
    },
  },
  primary: {
    meta: {
      title: 'Primary',
      desc: 'Beliebige HTML-Elemente mit Klassen atm-heading',
    },
    props: {
      title: 'Überschrift Stufe',
      small: '',
      link: 'und einem Link',
      variant: 'primary',
    },
  },
  inverted: {
    meta: {
      title: 'Inverted',
      desc: 'Beliebige HTML-Elemente mit Klassen atm-heading und atm-heading--inverted',
    },
    props: {
      title: 'Überschrift Stufe',
      small: '',
      link: 'und einem Link',
      variant: 'inverted',
      modifier: 'inverted',
    },
  },
}, (variant) => {
  const variantProps = _.merge({}, data, variant).props;
  const compiledVariant = () => handlebars.compile(template)(variantProps);
  const variantData = _.merge({}, data, variant, {
    meta: {
      demo: compiledVariant,

      code: {
        handlebars: dataHelper.getFormattedHandlebars(template),
        html: dataHelper.getFormattedHtml(compiledVariant()),
        data: dataHelper.getFormattedJson(variantProps),
      },
    },
  });

  return variantData;
});

data.variants = variants;

module.exports = data;
