import axios from 'axios';
import cookieSupport from 'axios-cookiejar-support';
import cheerio from 'cheerio';
import tough from 'tough-cookie';
import qs from 'qs';

cookieSupport(axios);

class AulaClient {
  #cookies: tough.CookieJar;
  #username: string;
  #password: string;
  #profiles?: any[] = [];
  #context?: any;

  constructor(username: string, password: string) {
    this.#cookies = new tough.CookieJar();
    this.#username = username;
    this.#password = password;
  }

  #createLoginCookie = async () => {
    const profiles = await this.request({
      method: 'profiles.getProfilesByLogin'
    });
    const context = await this.request({
      method: 'profiles.getProfileContext',
      portalrole: 'guardian',
    });
    this.#profiles = profiles.data.profiles;
    this.#context = context.data;
  }

  get loggedIn() {
    return !!this.context;
  }

  get profiles() {
    return this.#profiles!;
  }

  get context() {
    return this.#context!;
  }

  get childIds() {
    return this.profiles[0].children.map((c: any) => c.id);
  }

  login = async () => {
    let response = await axios.get('https://login.aula.dk/auth/login.php?type=unilogin', {
      jar: this.#cookies,
      withCredentials: true,
    });
    for (let i = 0; i < 10; i++) {
      if (response.config.url === 'https://www.aula.dk:443/portal/') {
        await this.#createLoginCookie();
        return;
      }
      const page = cheerio.load(response.data);
      const [form] = page('form');
      if (!form) {
        throw new Error('Form not found');
      }
      const { action } = form.attribs;
      const inputs = page('form input');
      const postData: {[name: string]: string} = {};
      for (let input of inputs) {
        const { name, value } = input.attribs;
        if (name === 'username') {
          postData.username = this.#username;
        } else if (name === 'password') {
          postData.password = this.#password;
        } else {
          postData[name] = value;
        }
      } 
      response = await axios.post(action, qs.stringify(postData), {
        jar: this.#cookies,
        withCredentials: true,
      });
    }
    throw new Error('Login took to many rounds');
  }

  public request = async <T = any>(query: any) => {
    const { data } = await axios.get<Response<T>>(`https://www.aula.dk/api/v11?${qs.stringify(query)}`, {
      jar: this.#cookies,
      withCredentials: true,
    })
    return data;
  }
}

export default AulaClient;
