import { FormJsonItem } from "./public";

/**
 * @description: 将prop作为key  每一项作为value
 * @param {FormJsonItem} rawList 表单配置
 * @return {*}
 */
const normalFormDataMap = (rawList: FormJsonItem[]) => {
  const temp: Record<string, FormJsonItem> = {};
  const list = Array.prototype.concat(...rawList);
  list.forEach((item: FormJsonItem) => {
    const { prop } = item;
    temp[prop] = item;
  });
  return temp;
};

/**
 * @description: 将prop作为key  每一项的值作为value
 * @param {FormJsonItem} rawList
 * @return {*}
 */
const extractData = (rawList: FormJsonItem[]) => {
  const temp: Record<string, any> = {};
  const list = Array.prototype.concat(...rawList);
  list.forEach((item: FormJsonItem) => {
    const { prop, data } = item;
    temp[prop] = data;
  });
  return temp;
};

export { normalFormDataMap, extractData };
