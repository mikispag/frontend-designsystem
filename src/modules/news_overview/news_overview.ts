/*!
 * NewsOverview
 *
 * @author
 * @copyright
 */
import Module from '../../assets/js/helpers/module';
import { template } from 'lodash';
import NewsFilterMobile from '../news_filter_mobile/news_filter_mobile';
import Select from '../select/select';
import FilterPills from '../filter_pills/filter_pills';
import Datepicker from '../datepicker/datepicker';

class NewsOverview extends Module {
  public ui: {
    element: any,
    teaserTemplate: any,
    pagination: HTMLDivElement,
    filter: HTMLDivElement,
    paginationInput: HTMLInputElement,
    topNews: HTMLDivElement,
    filterSelects: HTMLDivElement[],
    filterMobileButton: HTMLButtonElement,
    filterMobileModal: HTMLDivElement,
    filterMobile: HTMLDivElement,
    list: any,
    pills: HTMLDivElement,
    datePicker: HTMLDivElement,
    sortButton: HTMLButtonElement,
    sortDropdown: HTMLDivElement,
    searchWordInput: HTMLInputElement,
    searchWordInputClear: HTMLButtonElement,
  };
  private dataUrl: string;
  private dataIdle: boolean;
  private filterLists: any[];
  private searchWord: string;
  private dateRange: any[];
  private dateString: string;
  private filterHash: number;
  private filterHashZero: number;
  private dateHash: number;
  private dateHashZero: number;
  private searchWordHash: number;
  private searchWordHashZero: number;
  private sortDirection: string;

  constructor($element: any, data: Object, options: Object) {
    const defaultData = {};
    const defaultOptions = {
      domSelectors: {
        teaserTemplate: '[data-teaser-template]',
        pagination: '.mdl-pagination',
        filterSelects: '.mdl-news-overview__filter .mdl-select',
        filterMobileButton: '.mdl-news-overview__filter [data-news-filter-mobile]',
        filterMobileModal: '#news-filter-mobile',
        filterMobile: '#news-filter-mobile  .mdl-news-filter-mobile',
        paginationInput: '.mdl-pagination input',
        topNews: '.mdl-news-overview__topnews',
        list: '.mdl-news-overview__newsgrid .mdl-news-teaser__content > ul',
        pills: '.mdl-filter-pills',
        datePicker: '.mdl-news-overview__filter .mdl-datepicker',
        sortButton: '.mdl-news-overview__sort-dropdown',
        sortDropdown: '.mdl-news-overview__sort .mdl-context_menu',
        searchWordInput: '.mdl-news-overview__filter > .atm-form_input input',
        searchWordInputClear: '.mdl-news-overview__filter > .atm-form_input > button',
      },
      stateClasses: {
        // activated: 'is-activated'
      },
    };

    super($element, defaultData, defaultOptions, data, options);
    this.filterLists = [[], [], []]; // topics - organisations - type
    this.searchWord = '';
    this.dateRange = [];
    this.dateString = '';
    this.sortDirection = 'new';
    this.initUi();
    this.dataUrl = this.ui.element.getAttribute('data-source');
    this.dataIdle = true;
    this.filterHash = this.createObjectHash(this.filterLists);
    this.dateHash = this.createObjectHash(this.dateRange);
    this.searchWordHash = this.createObjectHash(this.searchWord);
    this.filterHashZero = this.filterHash;
    this.dateHashZero = this.dateHash;
    this.searchWordHashZero = this.searchWordHash;
    this.initEventListeners();
    // deferred filtering from URL params
    this.filterFromUrlParams();
    setTimeout(() => { this.filterView(true, true); }, 0);
  }

  static get events() {
    return {};
  }

  /**
   * Event listeners initialisation
   */
  initEventListeners() {
    // -----------------------------------------------
    // open modal and set selected filters
    this.ui.filterMobileButton.addEventListener('click', () => {
      this.ui.filterMobileModal.dispatchEvent(new CustomEvent('Modal.open'));
      const eventData = {
        detail: {
          filterLists: this.filterLists,
        },
      };
      this.ui.filterMobile.dispatchEvent(
        new CustomEvent(NewsFilterMobile.events.setSelectedFilterItems, eventData),
      );
    });
    // -----------------------------------------------
    // Listen to pagignation change event
    this.watch(this.ui.paginationInput, 'value', () => {
      setTimeout(() => {
      }, 0);
    });
    // -----------------------------------------------
    // Filter select events -- topics, organisations, types
    this.ui.filterSelects.forEach((filterSelect, index) => {
      filterSelect.addEventListener(Select.events.valueChanged, (event: any) => {
        this.filterLists[index] = event.detail;
      });
      filterSelect.addEventListener(Select.events.close, () => {
        this.filterView();
      });
    });
    // -----------------------------------------------
    // Listen to filter changed from mobile view
    this.ui.filterMobile
      .addEventListener(NewsFilterMobile.events.setSelectedFilterItems,
        (event: any) => {
          this.filterLists = event.detail.filterLists;
          this.filterView();
        });
    // -----------------------------------------------
    // Listen to remove event from filter pills
    this.ui.pills.addEventListener(FilterPills.events.removeTag, (event: any) => {
      const value = event.detail.target.getAttribute('data-pill');
      if (value.indexOf('filter:') === 0) {
        const filterValues = value.split(':');
        this.filterLists[filterValues[1]] = this.filterLists[filterValues[1]]
          .filter(e => e !== filterValues[2]);
      } else if (value === 'date-range') {
        this.dateRange = [];
        this.ui.datePicker.dispatchEvent(new CustomEvent(Datepicker.events.clear));
      }
      this.filterView(false);
    });
    // -----------------------------------------------
    // Listen to clear event from filter pills
    this.ui.pills.addEventListener(FilterPills.events.clearTags, () => {
      this.filterLists = [[], [], []];
      this.dateRange = [];
      this.dateString = '';
      this.searchWord = '';
      this.ui.datePicker.dispatchEvent(new CustomEvent(Datepicker.events.clear));
      this.ui.searchWordInput.value = '';
      this.filterView();
    });
    // -----------------------------------------------
    // Listen to date changed
    this.ui.datePicker.addEventListener(Datepicker.events.dateSet, (event: any) => {
      if (event.detail.dates.length < 2) { // eslint-disable-line
        return;
      }
      this.dateRange = event.detail.dates;
      this.dateString = event.detail.dateString;
      this.filterView();
    });
    // -----------------------------------------------
    // Listen to sort-dropdown events
    this.ui.sortButton.addEventListener('click', () => {
      this.ui.sortDropdown.classList.toggle('visible');
    });
    this.ui.sortDropdown.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', (event: any) => {
        this.sortDirection = event.target.getAttribute('data-sort');
        this.ui.sortButton.querySelector('span').innerHTML = event.target.innerHTML;
        this.ui.sortDropdown.classList.remove('visible');
        this.filterView();
      });
    });
    // -----------------------------------------------
    // Listen to Search input and clear event
    this.ui.searchWordInput.addEventListener('keypress', (event: any) => {
      if (event.key === 'Enter') {
        this.searchWord = event.target.value;
        this.filterView();
      }
    });
    this.ui.searchWordInputClear.addEventListener('click', () => {
      this.searchWord = '';
      this.filterView();
    });
  }

  /**
   * Update view in case filters changed
   */
  filterView(updateFilterPills = true, initialLoad = false) {
    const filterHash = this.createObjectHash(this.filterLists);
    const dateHash = this.createObjectHash(this.dateRange);
    const searchWordHash = this.createObjectHash(this.searchWord);

    if (initialLoad || this.filterHash !== filterHash
      || this.dateHash !== dateHash
      || this.searchWordHash !== searchWordHash) {
      if (updateFilterPills) {
        this.updatePills();
      }
      this.loadNewsTeasers();
      this.filterHash = filterHash;
      this.dateHash = dateHash;
      this.searchWordHash = searchWordHash;
    }
    this.ui.filterSelects.forEach((filterSelect, index) => {
      const eventData = {
        detail: this.filterLists[index],
      };
      filterSelect.dispatchEvent(new CustomEvent(Select.events.setValue, eventData));
    });

    // hide top news if any filter is active
    if (this.dateHash !== this.dateHashZero
      || this.filterHash !== this.filterHashZero
      || this.searchWordHash !== this.searchWordHashZero) {
      this.ui.topNews.classList.remove('visible');
    } else {
      this.ui.topNews.classList.add('visible');
    }
  }

  /**
   * Unbind events, remove data, custom teardown
   */
  destroy() {
    super.destroy();

    // Custom destroy actions go here
  }

  /**
   * Update pills to correspond with filter settings
   */
  updatePills() {
    const tags = [];
    // add pills for selected filters
    this.filterLists.forEach((filterList, index) => {
      filterList.forEach((filterValue) => {
        const inputCheckbox = (<HTMLInputElement> this.ui.filterSelects[index]
          .querySelector(`li input[value="${filterValue}"]`));
        if (inputCheckbox) {
          const tag = {
            text: (<HTMLInputElement> this.ui.filterSelects[index]
              .querySelector(`li input[value="${filterValue}"]`)).placeholder,
            value: `filter:${index}:${filterValue}`,
          };
          tags.push(tag);
        }
      });
    });
    // add pill for date
    if (this.dateRange.length === 2) { // eslint-disable-line
      tags.push({ text: this.dateString, value: 'date-range' });
    }
    // add pill for search word
    if (this.searchWord.length > 0) {
      tags.push({ text: this.searchWord, value: `fullText:${this.searchWord}` });
    }
    const eventData = {
      detail: tags,
    };
    this.ui.pills.dispatchEvent(new CustomEvent(FilterPills.events.setTags, eventData));
  }

  /**
   * Filters from URL params
   */
  filterFromUrlParams() {
    const topics = this.getURLParam('topic');
    const organisations = this.getURLParam('organisation');
    const types = this.getURLParam('type');
    const dateFromStr = this.getURLParam('dateFrom', true);
    const dateToStr = this.getURLParam('dateTo', true);
    const searchWord = this.getURLParam('fullText', true);
    const page = this.getURLParam('page', true);
    // const orderBy = this.getURLParam('orderBy', true);
    if (page) {
      this.ui.paginationInput.setAttribute('value', page);
    }
    this.searchWord = searchWord !== null ? searchWord : '';
    this.filterLists = [
      topics !== null ? topics : [],
      organisations !== null ? organisations : [],
      types !== null ? types : [],
    ];
    // ui update controls
    if (dateToStr && dateFromStr) {
      const dateTo = new Date(dateToStr);
      const dateFrom = new Date(dateFromStr);
      this.dateRange = [ dateFrom, dateTo ];
      this.dateString = `${('0' + dateFrom.getDate()).slice(-2)}.${('0' + (dateFrom.getMonth() + 1)).slice(-2)}.${dateFrom.getFullYear()} - ${('0' + dateTo.getDate()).slice(-2)}.${('0' + (dateTo.getMonth() + 1)).slice(-2)}.${dateTo.getFullYear()}`; // eslint-disable-line
      (<HTMLInputElement> this.ui.datePicker.querySelector('.atm-form_input__input')).value = this.dateString;
      this.ui.datePicker.classList.add('dirty');
    }
    if (this.searchWord.length > 0) {
      this.ui.searchWordInput.value = this.searchWord;
      this.ui.searchWordInput.classList.add('dirty');
    }
  }

  /**
   * Fetch teaser data
   * @param callback
   */
  async fetchData(callback: Function) {
    if (!window.fetch) {
      await import('whatwg-fetch');
    }
    return fetch(this.dataUrl) // TODO: add filters
      .then(response => response.json())
      .then((response) => {
        if (response) {
          callback(response);
        }
      })
      .catch((err) => {
        this.log('error', err);
      });
  }

  /**
   * Load news teasers
   */
  private loadNewsTeasers() {
    if (this.dataIdle) {
      this.dataIdle = false;
      // attach filters

      this.fetchData((jsonData) => {
        this.ui.pagination.setAttribute('data-pagecount', jsonData.numberOfResultPages);
        this.ui.pagination.querySelector('.mdl-pagination__page-count > span').innerHTML = jsonData.numberOfResultPages;
        this.populateNewsTeasers(jsonData);
        this.dataIdle = true;
      });
    }
  }

  /**
   * Build news raster
   * @param jsonData
   */
  private populateNewsTeasers(jsonData) {
    this.ui.list.innerHTML = '';
    jsonData.news.forEach((item) => {
      const element = document.createElement('li');
      element.classList.add('mdl-news-teaser__item');
      element.innerHTML = this.teaserItemFromTemplate(this.ui.teaserTemplate.innerHTML, item);
      this.ui.list.appendChild(element);
    });
  }

  /**
   * Create markup with template and properties
   * @param teaserTemplate
   * @param props
   */
  private teaserItemFromTemplate(teaserTemplate, props) {
    const compiled = template(teaserTemplate.replace(/this\./gm, 'self.')); // eslint-disable-line
    const data = {
      self: props,
    };
    return compiled(data);
  }
}

export default NewsOverview;
