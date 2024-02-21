export interface OauthResponse {
  redirect_url: string
}

export interface CallbackResponse {
  access_token: string
  refresh_token: string
  token_type: string
}
