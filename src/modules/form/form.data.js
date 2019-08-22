const _ = require('lodash');
const dataHelper = require('@unic/estatico-data');
const { handlebars } = require('@unic/estatico-handlebars');
const defaultData = require('../../data/default.data.js');

const formInputHBS = dataHelper.getFileContent('../../atoms/form_input/form_input.hbs');
const formInputData = require('../../atoms/form_input/form_input.data');

const formFieldsetHBS = dataHelper.getFileContent('./_form.fieldset.hbs');

const checkboxHBS = dataHelper.getFileContent('../../atoms/checkbox/checkbox.hbs');
const checkboxData = require('../../atoms/checkbox/checkbox.data');

const radioHBS = dataHelper.getFileContent('../../atoms/radiobutton/radiobutton.hbs');
const radioData = require('../../atoms/radiobutton/radiobutton.data');

const template = dataHelper.getFileContent('form.hbs');
const data = _.merge({}, defaultData, {
  meta: {
    title: 'FormSection',
    className: 'FormSection',
    jira: 'CZHDEV-850',
    documentation: dataHelper.getDocumentation('form.md'),
    hideFromListing: true,
  },
  props: {
    sectionTitle: 'Persönliche Angaben',
    rows: [
      [
        {
          isSmall: true,
          cellContent: () => handlebars.compile(formFieldsetHBS)({
            fieldsetTitle: 'Anrede',
            requiredMessage: 'Bitte geben Sie ihre Anrede an.',
            options: [
              () => handlebars.compile(radioHBS)(_.merge({},
                radioData.variants.default.props,
                {
                  label: 'Frau',
                  groupName: 'salutation',
                  id: 1,
                  value: 'mrs',
                  validation: {
                    isRequired: true,
                  },
                })),
              () => handlebars.compile(radioHBS)(_.merge({},
                radioData.variants.default.props,
                {
                  label: 'Herr',
                  groupName: 'salutation',
                  id: 2,
                  value: 'mr',
                  validation: {
                    isRequired: true,
                  },
                })),
              () => handlebars.compile(radioHBS)(_.merge({},
                radioData.variants.default.props,
                {
                  label: 'Keine Angabe',
                  groupName: 'salutation',
                  id: 3,
                  value: 'no',
                  validation: {
                    isRequired: true,
                  },
                })),
            ],
          }),
        },
      ],
      [{
        cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
          formInputData.variants.default.props,
          {
            isFloatingLabel: true,
            label: 'Vorname',
            name: 'prename',
            uuid: 'prename',
            validation: {
              isRequired: true,
            },
          })),
      },
      {
        cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
          formInputData.variants.default.props,
          {
            isFloatingLabel: true,
            label: 'Nachname',
            name: 'surname',
            uuid: 'surname',
            validation: {
              isRequired: true,
            },
          })),
      }],
      [{
        isSmall: true,
        cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
          formInputData.variants.default.props,
          {
            isFloatingLabel: true,
            label: 'PLZ',
            name: 'zip',
            uuid: 'zip',
            validation: {
              isRequired: true,
              pattern: '^[0-9]{4,4}$',
              errorMsg: 'Bitte geben Sie eine gültige schweizerische Postleizahl an.',
            },
          })),
      },
      {
        cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
          formInputData.variants.default.props,
          {
            isFloatingLabel: true,
            label: 'Ort',
            name: 'city',
            uuid: 'city',
            validation: {
              isRequired: true,
            },
          })),
      }],
    ],
  },
});
const variants = _.mapValues({
  default: {
    meta: {
      title: 'Persönliche Angaben',
      desc: 'Persönliche Angaben',
    },
  },
  careerInfo: {
    meta: {
      title: 'Berufliche Informationen',
      desc: 'Berufliche Informaitonen',
    },
    props: {
      sectionTitle: 'Berufliche Angaben',
      rows: [
        [
          {
            isSmall: true,
            cellContent: () => handlebars.compile(formFieldsetHBS)({
              fieldsetTitle: 'Auswahl',
              requiredMessage: 'Bitte geben Sie eine Option an.',
              isVertical: true,
              options: [
                () => handlebars.compile(checkboxHBS)(_.merge({},
                  checkboxData.variants.default.props,
                  {
                    label: 'Option 1',
                    groupName: 'checkboxgroup',
                    id: 11,
                    value: '1',
                    validation: {
                      isRequired: true,
                    },
                  })),
                () => handlebars.compile(checkboxHBS)(_.merge({},
                  checkboxData.variants.default.props,
                  {
                    label: 'Option 2',
                    groupName: 'checkboxgroup',
                    id: 12,
                    value: '2',
                    validation: {
                      isRequired: true,
                    },
                  })),
                () => handlebars.compile(checkboxHBS)(_.merge({},
                  checkboxData.variants.default.props,
                  {
                    label: 'Option 2',
                    groupName: 'checkboxgroup',
                    id: 313,
                    value: '3',
                    validation: {
                      isRequired: true,
                    },
                  })),
              ],
            }),
          },
        ],
        [
          {
            cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
              formInputData.variants.default.props,
              {
                isFloatingLabel: true,
                label: 'Aktuelle Berufsebezichnung',
                name: 'current_job',
                uuid: 'current_job',
                validation: {
                  isRequired: true,
                },
              })),
          },
        ],
        [
          {
            cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
              formInputData.variants.default.props,
              {
                isFloatingLabel: true,
                label: 'Berufslehre als',
                name: 'education_origin',
                uid: 'education_origin',
                validation: {
                  isRequired: true,
                },
              })),
          },
        ],
      ],
    },
  },
  defaultDuplicate: {
    meta: {
      title: 'Default mit anderen IDs',
      desc: '',
    },
    props: {
      rows: [
        [
          {
            isSmall: true,
            cellContent: () => handlebars.compile(formFieldsetHBS)({
              fieldsetTitle: 'Anrede',
              requiredMessage: 'Bitte geben Sie ihre Anrede an.',
              options: [
                () => handlebars.compile(radioHBS)(_.merge({},
                  radioData.variants.default.props,
                  {
                    label: 'Frau',
                    groupName: 'salutation2',
                    id: 6,
                    value: 'mrs',
                    validation: {
                      isRequired: true,
                    },
                  })),
                () => handlebars.compile(radioHBS)(_.merge({},
                  radioData.variants.default.props,
                  {
                    label: 'Herr',
                    groupName: 'salutation2',
                    id: 7,
                    value: 'mr',
                    validation: {
                      isRequired: true,
                    },
                  })),
                () => handlebars.compile(radioHBS)(_.merge({},
                  radioData.variants.default.props,
                  {
                    label: 'Keine Angabe',
                    groupName: 'salutation2',
                    id: 8,
                    value: 'no',
                    validation: {
                      isRequired: true,
                    },
                  })),
              ],
            }),
          },
        ],
        [{
          cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
            formInputData.variants.default.props,
            {
              isFloatingLabel: true,
              label: 'Vorname',
              name: 'prename',
              uuid: 'prename2',
              validation: {
                isRequired: true,
              },
            })),
        },
        {
          cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
            formInputData.variants.default.props,
            {
              isFloatingLabel: true,
              label: 'Nachname',
              name: 'surname',
              uuid: 'surname2',
              validation: {
                isRequired: true,
              },
            })),
        }],
        [{
          isSmall: true,
          cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
            formInputData.variants.default.props,
            {
              isFloatingLabel: true,
              label: 'PLZ',
              name: 'zip',
              uuid: 'zip2',
              validation: {
                isRequired: true,
                pattern: '^[0-9]{4,4}$',
                errorMsg: 'Bitte geben Sie eine gültige schweizerische Postleizahl an.',
              },
            })),
        },
        {
          cellContent: () => handlebars.compile(formInputHBS)(_.merge({},
            formInputData.variants.default.props,
            {
              isFloatingLabel: true,
              label: 'Ort',
              name: 'city',
              uuid: 'city2',
              validation: {
                isRequired: true,
              },
            })),
        }],
      ],
    },
  },
}, (variant) => {
  // eslint-disable
  const variantProps = _.mergeWith({}, data, variant, (dataValue, variantValue, key) => {
    if (key === 'rows' || Array.isArray(variantValue)) { return variantValue; }
  }).props;
  const compiledVariant = () => handlebars.compile(template)(variantProps);
  const variantData = _.mergeWith({}, data, variant, {
    meta: {
      demo: compiledVariant,

      code: {
        handlebars: dataHelper.getFormattedHandlebars(template),
        html: dataHelper.getFormattedHtml(compiledVariant()),
        data: dataHelper.getFormattedJson(variantProps),
      },
    },
  }, (dataValue, variantValue, key) => {
    if (key === 'rows' || Array.isArray(variantValue)) { return variantValue; }
  });

  return variantData;
});


data.variants = variants;

module.exports = data;
