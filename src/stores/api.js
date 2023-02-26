import { defineStore } from 'pinia';
import API from '@/services/api/Api';
import Http from '@/services/http/Http';
import Url from '@/services/url/Url';

const urlService = new Url(',');

export const useApiStore = defineStore('api', {
  // state: () => ({ count: 0, name: 'Eduardo' }),
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  // },
  actions: {
    /**
     * Retrieve instance (single instance)
     * @param {object} dispatch
     * @param {object} param1: object containing model (API.js) and instance id
     * @returns Request promise
     */
    retrieve(endpoint, id) {
      return new Promise((resolve, reject) => {
        Http.get(API.url(endpoint, id), API.getHeaders())
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            // this.dispatch('loadProgress', 100);
          });
      });
    },

    /**
     * List instances (multiple instances)
     * @param {object} dispatch
     * @param {object} param1: object containing model (API.js) and queryparams obj
     * @returns Request promise
     */
    list(endpoint, params) {
      return new Promise((resolve, reject) => {
        const url = params
          ? API.url(endpoint) + urlService.objectToQuerystring(params)
          : API.url(endpoint);
        Http.get(url, API.getHeaders())
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            // this.dispatch('handleError', err);
            reject(err);
          })
          .finally(() => {
            // this.dispatch('loadProgress', 100);
          });
      });
    },
  },
});
