import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  /** Login a user and receive back a token. LoginData = {username, password}*/
  static async login(loginData){
    let res = await this.request(`token`, loginData, method='post');
    return res.token;
  }

  /** Signup a user and receive back a token. signupData = {username, password, firstName, lastName, email} */
  static async signup(signupData){
    let res = await this.request(`register`, signupData, method='post');
    return res.token;
  }

  /** Get list of all companies */
  static async getAllCompanies(){
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Get a filtered list of companies. searchFilters = {minEmployees, maxEmployees, name} */
  static async getFilteredCompanies(searchFilters) {
    console.log('filtered api call started')
    let {minEmployees, maxEmployees, name} = searchFilters;
    let url = 'companies?';
    if (minEmployees) {
      url = url + `minEmployees=${minEmployees}&`;
    }
    if (maxEmployees){
      url = url + `maxEmployees=${maxEmployees}&`;
    }
    if (name) {
      url = url + `name=${name}`
    }
    let res = await this.request(url);
    console.log(res);
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**Get list of all jobs */
  static async getAllJobs(){
    let res = await this.request(`jobs`)
    return res.jobs;
  }

  /** Get a filtered list of jobs. searchFilters = {salary, equity, title}*/
  static async getFilteredJobs(searchFilters){
    let {salary, equity, title} = searchFilters;
    let url = 'jobs?'
    if (salary){
      url = url + `minSalary=${salary}&`;
    }
    if (equity) {
      url=url+`hasEquity=${equity}&`;
    }
    if(title) {
      url= url + `title=${title}`;
    }
    let res = await this.request(`jobs?minSalary=${salary}&hasEquity=${equity}&title=${title}`);
    return res.jobs;
  }

  /** Get a user's details */
  static async getUserDetails(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Edit a user's details. userData = {username, firstName, lastName, password, email} */
  static async editUserDetails(username, userData){
    let res = await this.request(`users/${username}`, userData, method='patch');
    return res.user;
  }

  /** Delete a user's account */
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, method='delete');
    return res.deleted;
  }

  /**Create job application for a user */
  static async applyToJob(username, jobId){
    let res = await this.request(`users/${username}/jobs/${jobId}`, method="post");
    return res.applied;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
