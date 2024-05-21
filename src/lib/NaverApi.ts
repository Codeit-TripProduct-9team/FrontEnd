const NaverApi = () => {
  const CLIENT_ID = "vqCyfiJhKVdpuZhaAZzB"
  const STATE = "false"
  const REDIRECT_URI = "http://localhost:3000/"
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`

  const naverLogin = () => {
    window.location.href=NAVER_AUTH_URL
  }
naverLogin()
  
}



export default NaverApi