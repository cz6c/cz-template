// 列表请求
export interface GetListParams {
  page?: number;
  limit?: number;
  count?: number;
}
// 列表响应
export interface GetListResponse<T> {
  list: T[];
  count: number;
  limit: number;
  page: number;
  pageCount: number;
}

// 登录参数
export interface LoginParams {
  userName: string;
  password: string;
  code: string;
}

// 用户信息
export interface UserInfo {
  id: string;
  token: string;
  userName: string;
  avatar: string;
  phone: string;
  name: string;
}

// 菜单数据
export interface MenuData {
  menu: [];
}
