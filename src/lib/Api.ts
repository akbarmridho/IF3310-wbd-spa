/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiError {
  message: string;
}

/** Request body validation fails */
export interface ApiValidationError {
  /** @example "Bad Request" */
  error: string;
  messages: {
    /** @example "phone" */
    field?: string;
    /** @example "Invalid phone number format" */
    message?: string;
  }[];
}

/** Request body validation fails */
export interface ApiValidationSingleError {
  /** @example "Bad Request" */
  error: string;
  message?: string;
}

export interface ApiUserInstance {
  id: number;
  /** Should be unique. Only contains lowercase, numbers, and symbol . and _ */
  username: string;
  name: string;
  /** @format date-time */
  createdAt: string;
}

export interface ApiAnimeInstance {
  id: string;
  title: string;
  status: "upcoming" | "airing" | "aired";
  totalEpisodes?: number;
  airedEpisodes?: number;
  broadcastInformation?: string;
  /** @format date-time */
  createdAt: string;
}

export interface ApiEpisodeInstance {
  animeId: string;
  title: string;
  episodeNumber: number;
  totalViewers: number;
  filename: string;
  /** @format date-time */
  createdAt: string;
}

export type ApiLoginData = any;

export type ApiLoginError = ApiValidationError | ApiValidationSingleError;

export interface ApiRegisterData {
  data: ApiUserInstance;
}

export type ApiRegisterError = ApiValidationSingleError | ApiValidationError;

export type ApiLogoutData = any;

export type ApiChangePasswordData = any;

export type ApiChangePasswordError =
  | ApiValidationSingleError
  | ApiValidationError;

export interface ApiProfileData {
  data: ApiUserInstance;
}

export interface ApiGetAllAnimeData {
  data: ApiAnimeInstance[];
}

export interface ApiCreateAnimeData {
  data: ApiAnimeInstance;
}

export type ApiCreateAnimeError = ApiValidationSingleError | ApiValidationError;

export interface ApiGetAnimeData {
  data: ApiAnimeInstance;
}

export type ApiGetAnimeError = ApiValidationSingleError | ApiValidationError;

export interface ApiUpdateAnimeData {
  data: ApiAnimeInstance;
}

export type ApiUpdateAnimeError = ApiValidationSingleError | ApiValidationError;

export interface ApiDeleteAnimeData {
  data: ApiAnimeInstance;
}

export type ApiDeleteAnimeError = ApiValidationSingleError | ApiValidationError;

export interface ApiGetAllEpisodesData {
  data: ApiEpisodeInstance[];
}

export type ApiGetAllEpisodesError =
  | ApiValidationSingleError
  | ApiValidationError;

export interface ApiCreateEpisodeData {
  data: ApiEpisodeInstance;
}

export type ApiCreateEpisodeError =
  | ApiValidationSingleError
  | ApiValidationError;

export interface ApiGetEpisodeData {
  data: ApiEpisodeInstance;
}

export type ApiGetEpisodeError = ApiValidationSingleError | ApiValidationError;

export interface ApiUpdateEpisodeData {
  data: ApiEpisodeInstance;
}

export type ApiUpdateEpisodeError =
  | ApiValidationSingleError
  | ApiValidationError;

export interface ApiDeleteEpisodeData {
  data: ApiEpisodeInstance;
}

export type ApiDeleteEpisodeError =
  | ApiValidationSingleError
  | ApiValidationError;

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:3000",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { "Content-Type": type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Wibu Watch
 * @version 1.0
 * @baseUrl http://localhost:3000
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  login = {
    /**
     * No description
     *
     * @tags auth
     * @name Login
     * @summary Login request
     * @request POST:/login
     */
    login: (
      data: {
        /**
         * Username
         * @example "admin"
         */
        username: string;
        /** @example "password" */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiLoginData, ApiLoginError>({
        path: `/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  register = {
    /**
     * No description
     *
     * @tags auth
     * @name Register
     * @summary Register user
     * @request POST:/register
     */
    register: (
      data: {
        /**
         * Should be unique. only could contain lowercase letters, numbers, and . or _ symbols
         * @example "admin_123"
         */
        username: string;
        /**
         * Minimum 8 chars
         * @example "password123"
         */
        password: string;
        /** @example "John Doe" */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiRegisterData, ApiRegisterError>({
        path: `/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags auth
     * @name Logout
     * @summary Logout
     * @request POST:/logout
     * @secure
     */
    logout: (params: RequestParams = {}) =>
      this.request<ApiLogoutData, any>({
        path: `/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags profile
     * @name ChangePassword
     * @summary Change user password
     * @request PUT:/profile/password
     */
    changePassword: (
      data: {
        /**
         * Minimum 8 chars
         * @example "password123"
         */
        oldPassword: string;
        /**
         * Minimum 8 chars
         * @example "password123"
         */
        newPassword: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiChangePasswordData, ApiChangePasswordError>({
        path: `/profile/password`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags profile
     * @name Profile
     * @summary Get profile
     * @request GET:/profile
     */
    profile: (params: RequestParams = {}) =>
      this.request<ApiProfileData, any>({
        path: `/profile`,
        method: "GET",
        ...params,
      }),
  };
  anime = {
    /**
     * No description
     *
     * @tags anime
     * @name GetAllAnime
     * @summary Get all anime
     * @request GET:/anime
     * @secure
     */
    getAllAnime: (params: RequestParams = {}) =>
      this.request<ApiGetAllAnimeData, any>({
        path: `/anime`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags anime
     * @name CreateAnime
     * @summary Add anime
     * @request POST:/anime
     */
    createAnime: (
      data: {
        id: string;
        status: "upcoming" | "airing" | "aired";
        totalEpisodes?: number;
        broadcastInformation?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiCreateAnimeData, ApiCreateAnimeError>({
        path: `/anime`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags anime
     * @name GetAnime
     * @summary Get anime by id
     * @request GET:/anime/{id}
     * @secure
     */
    getAnime: (id: string, params: RequestParams = {}) =>
      this.request<ApiGetAnimeData, ApiGetAnimeError>({
        path: `/anime/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags anime
     * @name UpdateAnime
     * @summary Update anime
     * @request PUT:/anime/{id}
     */
    updateAnime: (
      id: string,
      data: {
        status: "upcoming" | "airing" | "aired";
        totalEpisodes?: number;
        broadcastInformation?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiUpdateAnimeData, ApiUpdateAnimeError>({
        path: `/anime/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags anime
     * @name DeleteAnime
     * @summary Delete anime by id
     * @request DELETE:/anime/{id}
     * @secure
     */
    deleteAnime: (id: string, params: RequestParams = {}) =>
      this.request<ApiDeleteAnimeData, ApiDeleteAnimeError>({
        path: `/anime/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags episodes
     * @name GetAllEpisodes
     * @summary Get episodes of an anime
     * @request GET:/anime/{id}/episodes
     * @secure
     */
    getAllEpisodes: (id: string, params: RequestParams = {}) =>
      this.request<ApiGetAllEpisodesData, ApiGetAllEpisodesError>({
        path: `/anime/${id}/episodes`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags episodes
     * @name CreateEpisode
     * @summary Add episode to an anime
     * @request POST:/anime/{id}/episodes
     */
    createEpisode: (
      id: string,
      data: {
        animeId: string;
        title: string;
        episodeNumber: number;
        filename: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiCreateEpisodeData, ApiCreateEpisodeError>({
        path: `/anime/${id}/episodes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags episodes
     * @name GetEpisode
     * @summary Get an episode of an anime
     * @request GET:/anime/{id}/episodes/{episode_number}
     * @secure
     */
    getEpisode: (
      id: string,
      episodeNumber: number,
      params: RequestParams = {},
    ) =>
      this.request<ApiGetEpisodeData, ApiGetEpisodeError>({
        path: `/anime/${id}/episodes/${episodeNumber}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags episodes
     * @name UpdateEpisode
     * @summary Update anime
     * @request PUT:/anime/{id}/episodes/{episode_number}
     */
    updateEpisode: (
      id: string,
      episodeNumber: number,
      data: {
        title: string;
        episodeNumber: number;
        filename: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiUpdateEpisodeData, ApiUpdateEpisodeError>({
        path: `/anime/${id}/episodes/${episodeNumber}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags episodes
     * @name DeleteEpisode
     * @summary Delete anime by id
     * @request DELETE:/anime/{id}/episodes/{episode_number}
     * @secure
     */
    deleteEpisode: (
      id: string,
      episodeNumber: number,
      params: RequestParams = {},
    ) =>
      this.request<ApiDeleteEpisodeData, ApiDeleteEpisodeError>({
        path: `/anime/${id}/episodes/${episodeNumber}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
