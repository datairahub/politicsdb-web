import { defineStore } from 'pinia';
import API from '@/services/api/Api';
import Http from '@/services/http/Http';
import Url from '@/services/url/Url';

const urlService = new Url(',');
const apiCache = {};

export const useApiStore = defineStore('api', {
  // state: () => ({ }),
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
    retrieve(endpoint, id, params, useCache = true) {
      const url = params
        ? API.url(endpoint, id) + urlService.objectToQuerystring(params)
        : API.url(endpoint, id);

      if (useCache && apiCache[url]) {
        return new Promise((resolve) => {
          resolve(apiCache[url]);
        });
      }

      return new Promise((resolve, reject) => {
        Http.get(url, API.getHeaders())
          .then(({ data }) => {
            if (useCache) apiCache[url] = data;
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
    list(endpoint, params, useCache = true) {
      const url = params
        ? API.url(endpoint) + urlService.objectToQuerystring(params)
        : API.url(endpoint);

      if (useCache && apiCache[url]) {
        return new Promise((resolve) => {
          resolve(apiCache[url]);
        });
      }

      return new Promise((resolve, reject) => {
        Http.get(url, API.getHeaders())
          .then(({ data }) => {
            if (useCache) apiCache[url] = data;
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
