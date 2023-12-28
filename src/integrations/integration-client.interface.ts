export interface IntegrationClient<Options, Response> {
  get(options: Options): Promise<Response>;
}
