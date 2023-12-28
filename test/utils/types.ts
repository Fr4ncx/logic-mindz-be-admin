export interface ConfigApp {
  urls: {
    baseUrl: string;
    loginUrl: string;
    healthCheck: string;
    getDocuments: string;
    getDocumentsTree: string;
    getBuckets: string;
    getComponentProductCode: string;
  };
  credentials: {
    admin: {
      identifier: string;
      password: string;
      scope: string;
    };
  };
}

export interface ReqResponse {
  status: number;
  data: Record<string, string>;
  errors: Record<string, string>;
  success: boolean;
  headers: Headers;
}
